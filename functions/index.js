// core imports
const fs = require('fs');
const os = require('os');
const path = require('path');
const Busboy = require('busboy');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
const functions = require('firebase-functions');
const axios = require('axios');

// gmail
const mail = 'kitsinfo1234@gmail.com';
const app_password = 'cmomofaurjbfiqfx';

// Firebase Configuration
const admin = require('firebase-admin');

const serviceAccount = require('./kitschocolate-bc8f8-firebase-adminsdk-hrvum-cbd63441c4.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://kitschocolate-bc8f8.firebaseio.com'
});

// File Upload Endpoint
exports.uploadFile = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(500).json({
        message: 'Not allowed!'
      });
    }

    let uploadData = null;

    const type = req?.query?.type || 'chocolates';
    const busboy = new Busboy({ headers: req.headers });

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename);
      uploadData = { filename, file: filepath, type: mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on('finish', () => {
      const bucket = admin.storage().bucket('kitschocolate-bc8f8.appspot.com');

      return bucket
        .upload(uploadData.file, {
          uploadType: 'media',
          destination: `images/${type}/${uploadData.filename}`,
          metadata: {
            metadata: {
              contentType: uploadData.type
            }
          }
        })
        .then(() => {
          // eslint-disable-next-line
          const url = `https://firebasestorage.googleapis.com/v0/b/kitschocolate-bc8f8.appspot.com/o/images%2F${type}%2F${uploadData.filename}?alt=media`;
          const imagesRef = admin
            .database()
            .ref(`images/${type}`)
            .push();

          const id = imagesRef.key;

          imagesRef
            .set({ id, url, type, filename: uploadData.filename })
            .then(() => {
              return res.status(200).json({
                message: 'it worked!'
              });
            });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
    busboy.end(req.rawBody);
  });
});

exports.contactUs = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const { url, name, email, phone, description } = req.body;

    const transporter = nodemailer.createTransport({
      port: 465,
      secure: true,
      host: 'smtp.gmail.com',
      auth: {
        user: mail,
        pass: app_password
      }
    });

    const html = `
      <h1>Зв'яжіться з нами</h1>
      <div>
        <div><b>Повне ім'я</b>: ${name}</div>
        <div><b>Телефон</b>: ${phone}</div>
        <div><b>Email</b>: ${email}</div>
        <div><b>URL компанії</b>: ${url}</div>
        <div><b>Опис</b>: ${description}</div>
      </div>
    `;

    const mailOptions = {
      html,
      subject: 'Партнерство',
      from: 'Kits Chocolate Website',
      to: 'kitscustomers@gmail.com'
    };

    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('-----transporter-----', error, info);

        return res.send(error.toString());
      }

      return res.send('Sended');
    });
  });
});

exports.acceptOrder = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const { items, total, orderId, acceptedDate, orderDescription } = req.body;

    const {
      call,
      email,
      shipTo,
      comments,
      lastName,
      firstName,
      paymentType,
      phoneNumber
    } = orderDescription;

    const transporter = nodemailer.createTransport({
      port: 465,
      secure: true,
      host: 'smtp.gmail.com',
      auth: {
        user: mail,
        pass: app_password
      }
    });

    const mappedItems = Object.values(items).map(
      ({ title, quantity, subtotal }) =>
        `${title} (${quantity}) - ${subtotal} грн.`
    );

    const html = `
      <h1>Підтвердження замовлення</h1>
      <div>
        <h2>Опис клієнта</h2>
        <div><b>Дата прийняття</b>: ${acceptedDate}</div>
        <div><b>Ім'я клієнта</b>: ${lastName} ${firstName}</div>
        <div><b>Телефон</b>: ${phoneNumber}</div>
        <div><b>Email</b>: ${email}</div>
        <div><b>Доставка</b>: ${shipTo}</div>
        <div><b>Тип оплати</b>: ${paymentType}</div>
        <div><b>Дзвінок</b>: ${call}</div>
        <div><b>Коментарі</b>: ${comments}</div>
      </div>
      <div>
        <h2>Товари:</h2>
        <div>${mappedItems.join('<br />')}</div>
      </div>
      <h2>Всього: ${total} грн.</h2>
    `;

    const mailOptions = {
      html,
      subject: 'Підтвердження замовлення',
      to: 'kitscustomers@gmail.com, greedisgood214@gmail.com',
      from: 'Kits Chocolate Website'
    };

    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('-----transporter-----', error, info);

        return res.send(error.toString());
      }

      const ref = admin.database().ref(`orders/${orderId}`);

      ref
        .update(req.body)
        .then(res.send({ message: 'Success' }))
        .catch(firebaseError => res.send(`'Error' - ${firebaseError}`));
    });
  });
});

// Monobank API Payment Function
exports.createMonobankPayment = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({
        message: 'Method not allowed!'
      });
    }

    try {
      const {
        amount,
        currency = 'UAH',
        orderId,
        redirectUrl,
        webHookUrl,
        paymentType = 'debit',
        merchantPaymInfo
      } = req.body;

      // Validate required fields
      if (!amount || !orderId || !redirectUrl) {
        return res.status(400).json({
          error: 'Missing required fields: amount, orderId, redirectUrl'
        });
      }

      // Monobank API configuration
      const MONOBANK_API_URL = 'https://api.monobank.ua/api/merchant';
      const MONOBANK_TOKEN = functions.config().monobank?.token; // Access Firebase config

      if (!MONOBANK_TOKEN) {
        return res.status(500).json({
          error: 'Monobank token not configured'
        });
      }

      // Convert currency string to integer code
      const getCurrencyCode = currencyStr => {
        const currencyMap = {
          UAH: 980,
          USD: 840,
          EUR: 978
        };
        return currencyMap[currencyStr] || 980; // Default to UAH
      };

      // Create payment request payload
      const paymentData = {
        amount: Math.round(amount * 100), // Convert to kopiyky (cents)
        ccy: getCurrencyCode(currency), // Convert to integer currency code
        merchantPaymInfo: merchantPaymInfo || {
          reference: orderId,
          destination: 'Kits Chocolate Purchase',
          basketOrder: [
            {
              name: 'Chocolate Products',
              qty: 1,
              unit: 'шт',
              code: orderId,
              price: Math.round(amount * 100),
              sum: Math.round(amount * 100)
            }
          ]
        },
        redirectUrl,
        webHookUrl:
          webHookUrl ||
          `${req.protocol}://${req.get('host')}/api/monobank-webhook`,
        paymentType,
        validity: 3600, // 1 hour in seconds
        paymentScheme: 'monobank'
      };

      // Make request to Monobank API
      console.log('Sending request to Monobank API:', {
        url: `${MONOBANK_API_URL}/invoice/create`,
        data: paymentData,
        token: MONOBANK_TOKEN ? '***' : 'MISSING'
      });

      const response = await axios.post(
        `${MONOBANK_API_URL}/invoice/create`,
        paymentData,
        {
          headers: {
            'X-Token': MONOBANK_TOKEN,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      console.log('Monobank API response:', {
        status: response.status,
        data: response.data,
        hasId: !!response.data?.id,
        hasPageUrl: !!response.data?.pageUrl
      });

      // Validate response data - Monobank returns invoiceId, not id
      if (!response.data || !response.data.invoiceId) {
        console.error('Invalid Monobank response:', response.data);
        return res.status(500).json({
          error: 'Invalid response from Monobank API',
          details: 'Missing invoice ID in response',
          responseData: response.data
        });
      }

      // Save payment info directly to orders object
      const orderRef = admin.database().ref(`orders/${orderId}`);
      const paymentDataToSave = {
        payment: {
          amount,
          currency,
          paymentStatus: 'pending',
          paymentId: response.data.invoiceId, // Use invoiceId instead of id
          createdAt: new Date().toISOString(),
          monobankData: response.data
        }
      };

      // Add optional fields if they exist
      if (response.data.pageUrl) {
        paymentDataToSave.payment.invoiceUrl = response.data.pageUrl;
      }

      await orderRef.update(paymentDataToSave);

      return res.status(200).json({
        success: true,
        paymentId: response.data.invoiceId, // Use invoiceId instead of id
        invoiceUrl: response.data.pageUrl || null,
        redirectUrl: response.data.pageUrl || null
      });
    } catch (error) {
      console.error(
        'Monobank payment error:',
        error.response?.data || error.message
      );

      return res.status(500).json({
        error: 'Payment creation failed',
        details: error.response?.data || error.message
      });
    }
  });
});

// Save checkout form draft (values, errors, touched, etc.) to Firebase
exports.saveOrderDraft = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({
        message: 'Method not allowed!'
      });
    }

    try {
      const { orderId, draftForm } = req.body || {};

      if (!orderId || !draftForm) {
        return res.status(400).json({
          error: 'Missing required fields: orderId, draftForm'
        });
      }

      const orderRef = admin.database().ref(`orders/${orderId}`);

      await orderRef.update({
        draftForm,
        status: 'DRAFT',
        draftUpdatedAt: new Date().toISOString()
      });

      return res.status(200).json({
        success: true
      });
    } catch (error) {
      console.error('saveOrderDraft error:', error);
      return res.status(500).json({
        error: 'Failed to save order draft',
        message: error.message
      });
    }
  });
});

// Monobank Webhook Handler
exports.monobankWebhook = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({
        message: 'Method not allowed!'
      });
    }

    try {
      console.log('Monobank webhook received:', {
        headers: req.headers,
        body: req.body,
        timestamp: new Date().toISOString()
      });

      const { invoiceId, status, amount, ccy, reference } = req.body;

      // Validate required fields
      if (!reference) {
        console.error('Webhook missing reference:', req.body);
        return res.status(400).json({
          error: 'Missing reference in webhook payload'
        });
      }

      if (!status) {
        console.error('Webhook missing status:', req.body);
        return res.status(400).json({
          error: 'Missing status in webhook payload'
        });
      }

      // Validate webhook signature (if Monobank provides one)
      const webhookSecret = functions.config().monobank?.webhook_secret;
      const signature =
        req.headers['x-signature'] || req.headers['x-monobank-signature'];

      if (signature && webhookSecret) {
        // TODO: Implement signature verification when Monobank provides signature format
        console.log(
          'Webhook signature received, verification not yet implemented'
        );
      }

      // Validate status values
      const validStatuses = ['success', 'failure', 'pending', 'expired'];
      if (!validStatuses.includes(status)) {
        console.error('Invalid webhook status:', status);
        return res.status(400).json({
          error: 'Invalid status value'
        });
      }

      // Update payment status in orders object
      const orderRef = admin.database().ref(`orders/${reference}`);
      // First, get the current payment data
      const orderSnapshot = await orderRef.once('value');
      const currentOrderData = orderSnapshot.val() || {};
      const currentPaymentData = currentOrderData.payment || {};

      // Update payment data
      const updatedPaymentData = {
        ...currentPaymentData,
        status: status,
        updatedAt: new Date().toISOString(),
        webhookData: req.body,
        lastWebhookReceived: new Date().toISOString()
      };

      // Add invoiceId if provided
      if (invoiceId) {
        updatedPaymentData.paymentId = invoiceId;
      }

      // Update the payment object
      await orderRef.update({
        payment: updatedPaymentData
      });
      console.log('Payment status updated:', { reference, status, invoiceId });

      // Update order status if payment is successful
      if (status === 'success' && invoiceId) {
        const orderUpdateData = {
          paymentStatus: 'paid',
          paidAt: new Date().toISOString(),
          paymentId: invoiceId,
          paymentMethod: 'monobank'
        };

        await orderRef.update(orderUpdateData);
        console.log('Order status updated to paid:', { reference, invoiceId });

        // Send confirmation email to customer
        try {
          // Use the order data we already fetched
          const orderData = currentOrderData;

          const customerEmail = orderData?.orderDescription?.email;

          if (!customerEmail) {
            console.log('No customer email found for order:', reference);
            // Send to admin as backup
            const adminEmail = 'kitscustomers@gmail.com';
            console.log(
              'Sending payment confirmation to admin email:',
              adminEmail
            );
          }

          const transporter = nodemailer.createTransport({
            port: 465,
            secure: true,
            host: 'smtp.gmail.com',
            auth: {
              user: mail,
              pass: app_password
            }
          });

          const formattedAmount = amount
            ? `${(amount / 100).toFixed(2)} ${ccy || 'UAH'}`
            : 'N/A';

          const customerName =
            orderData?.orderDescription?.firstName &&
            orderData?.orderDescription?.lastName
              ? `${orderData.orderDescription.firstName} ${
                  orderData.orderDescription.lastName
                }`
              : 'Шановний клієнт';

          const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
                <h1>Платіж підтверджено! 🎉</h1>
              </div>
              <div style="padding: 20px; background-color: #f9f9f9;">
                <h2>Шановний(а) ${customerName},</h2>
                <p>Ваш платіж успішно оброблено!</p>
                
                <div style="background-color: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #2e7d32;">Деталі замовлення</h3>
                  <p><strong>Номер замовлення:</strong> ${reference}</p>
                  <p><strong>ID платежу:</strong> ${invoiceId}</p>
                  <p><strong>Сума:</strong> ${formattedAmount}</p>
                  <p><strong>Спосіб оплати:</strong> Monobank</p>
                  <p><strong>Дата:</strong> ${new Date().toLocaleString(
                    'uk-UA'
                  )}</p>
                </div>
                
                <p style="color: #2e7d32; font-weight: bold;">
                  Дякуємо за покупку! Ваше замовлення буде оброблено найближчим часом.
                </p>
                
                <p>Якщо у вас є питання, будь ласка, зв'яжіться з нами: kitscustomers@gmail.com</p>
              </div>
            </div>
          `;

          // Send email to customer
          if (customerEmail) {
            const customerMailOptions = {
              html,
              subject: 'Платіж підтверджено - Kits Chocolate',
              to: customerEmail,
              from: 'Kits Chocolate Website'
            };

            await new Promise((resolve, reject) => {
              transporter.sendMail(customerMailOptions, (error, info) => {
                if (error) {
                  console.error('Customer email sending error:', error);
                  reject(error);
                } else {
                  console.log(
                    'Customer confirmation email sent:',
                    info.messageId
                  );
                  resolve(info);
                }
              });
            });
          }

          // Send notification email to admin
          const adminHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background-color: #2196F3; color: white; padding: 20px; text-align: center;">
                <h1>Отримано новий платіж! 💰</h1>
              </div>
              <div style="padding: 20px; background-color: #f9f9f9;">
                <h2>Сповіщення про платіж для адміністратора</h2>
                <p>Новий платіж успішно оброблено і потребує вашої уваги.</p>
                
                <div style="background-color: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #1976d2;">Деталі замовлення</h3>
                  <p><strong>Номер замовлення:</strong> ${reference}</p>
                  <p><strong>ID платежу:</strong> ${invoiceId}</p>
                  <p><strong>Сума:</strong> ${formattedAmount}</p>
                  <p><strong>Спосіб оплати:</strong> Monobank</p>
                  <p><strong>Клієнт:</strong> ${customerName}</p>
                  <p><strong>Email клієнта:</strong> ${customerEmail ||
                    'Не вказано'}</p>
                  <p><strong>Дата:</strong> ${new Date().toLocaleString(
                    'uk-UA'
                  )}</p>
                </div>
                
                <p style="color: #1976d2; font-weight: bold;">
                  Будь ласка, обробіть це замовлення для виконання.
                </p>
                
                <p><strong>Наступні кроки:</strong></p>
                <ul>
                  <li>Перевірте платіж в панелі Monobank</li>
                  <li>Підготуйте замовлення до відправки</li>
                  <li>Оновіть статус замовлення на "Обробляється"</li>
                  <li>Надішліть підтвердження відправки клієнту</li>
                </ul>
              </div>
            </div>
          `;

          const adminMailOptions = {
            html: adminHtml,
            subject: `Отримано новий платіж - Замовлення #${reference}`,
            to: 'kitscustomers@gmail.com, greedisgood214@gmail.com',
            from: 'Kits Chocolate Website'
          };

          await new Promise((resolve, reject) => {
            transporter.sendMail(adminMailOptions, (error, info) => {
              if (error) {
                console.error('Admin email sending error:', error);
                reject(error);
              } else {
                console.log('Admin notification email sent:', info.messageId);
                resolve(info);
              }
            });
          });
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
          // Don't fail the webhook if email fails
        }
      } else if (status === 'failure') {
        // Handle failed payment
        await orderRef.update({
          paymentStatus: 'failed',
          paymentFailedAt: new Date().toISOString(),
          paymentMethod: 'monobank'
        });
        console.log('Order status updated to failed:', { reference });
      }

      console.log('Webhook processed successfully:', {
        reference,
        status,
        invoiceId
      });
      return res.status(200).json({
        success: true,
        message: 'Webhook processed successfully',
        reference,
        status
      });
    } catch (error) {
      console.error('Webhook processing error:', error);
      return res.status(500).json({
        error: 'Webhook processing failed',
        message: error.message
      });
    }
  });
});

// Get Payment Status
exports.getPaymentStatus = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'GET') {
      return res.status(405).json({
        message: 'Method not allowed!'
      });
    }

    try {
      const { orderId } = req.query;

      if (!orderId) {
        return res.status(400).json({
          error: 'Order ID is required'
        });
      }

      const orderRef = admin.database().ref(`orders/${orderId}`);
      const snapshot = await orderRef.once('value');
      const orderData = snapshot.val();

      if (!orderData || !orderData.payment) {
        return res.status(404).json({
          error: 'Payment not found'
        });
      }

      return res.status(200).json({
        success: true,
        payment: orderData.payment
      });
    } catch (error) {
      console.error('Get payment status error:', error);
      return res.status(500).json({
        error: 'Failed to get payment status'
      });
    }
  });
});

// Update Order Payment Status (Admin Utility)
exports.updateOrderPaymentStatus = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({
        message: 'Method not allowed!'
      });
    }

    try {
      const {
        orderId,
        paymentStatus,
        paymentId,
        paymentMethod = 'monobank'
      } = req.body;

      // Validate required fields
      if (!orderId || !paymentStatus) {
        return res.status(400).json({
          error: 'Missing required fields: orderId, paymentStatus'
        });
      }

      // Validate payment status
      const validStatuses = ['pending', 'paid', 'failed', 'expired'];
      if (!validStatuses.includes(paymentStatus)) {
        return res.status(400).json({
          error:
            'Invalid payment status. Must be one of: pending, paid, failed, expired'
        });
      }

      const orderRef = admin.database().ref(`orders/${orderId}`);
      const now = new Date().toISOString();

      // Build update data based on status
      const updateData = {
        paymentStatus,
        paymentMethod,
        updatedAt: now
      };
      // Add status-specific fields
      switch (paymentStatus) {
        case 'paid':
          updateData.paidAt = now;
          if (paymentId) updateData.paymentId = paymentId;
          break;
        case 'failed':
          updateData.paymentFailedAt = now;
          if (paymentId) updateData.paymentId = paymentId;
          break;
        case 'expired':
          updateData.paymentExpiredAt = now;
          if (paymentId) updateData.paymentId = paymentId;
          break;
        case 'pending':
          // Reset any previous status timestamps
          updateData.paidAt = null;
          updateData.paymentFailedAt = null;
          updateData.paymentExpiredAt = null;
          break;
        default:
          // Handle any unexpected status values
          console.warn(`Unexpected payment status: ${paymentStatus}`);
          break;
      }

      await orderRef.update(updateData);

      console.log('Order payment status updated:', {
        orderId,
        paymentStatus,
        paymentId,
        paymentMethod
      });

      return res.status(200).json({
        success: true,
        message: 'Order payment status updated successfully',
        orderId,
        paymentStatus,
        updateData
      });
    } catch (error) {
      console.error('Update order payment status error:', error);
      return res.status(500).json({
        error: 'Failed to update order payment status',
        message: error.message
      });
    }
  });
});

// Scheduled functions are now imported from scheduled-functions.js

// Import scheduled functions
require('./scheduled-functions');
