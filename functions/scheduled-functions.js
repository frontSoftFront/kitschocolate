const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const nodemailer = require('nodemailer');

// Scheduled Function to Check Payment Statuses
exports.checkPaymentStatusesScheduled = functions.pubsub
  .schedule('every 5 minutes')
  .onRun(async context => {
    try {
      console.log('Starting scheduled payment status check...');

      // Get all orders with pending payments from Firebase
      const ordersRef = admin.database().ref('orders');
      const snapshot = await ordersRef
        .orderByChild('payment/status')
        .equalTo('pending')
        .once('value');

      const ordersWithPendingPayments = snapshot.val();

      if (!ordersWithPendingPayments) {
        console.log('No pending payments found');
        return null;
      }

      console.log(
        `Found ${
          Object.keys(ordersWithPendingPayments).length
        } pending payments`
      );

      const updatePromises = [];
      const now = new Date();
      // Process pending payments in parallel
      await Promise.all(
        Object.entries(ordersWithPendingPayments).map(
          async ([orderId, orderData]) => {
            const { payment } = orderData;
            try {
              // Skip payments older than 24 hours (they might be expired)
              const createdAt = new Date(payment.createdAt);
              const hoursSinceCreation = (now - createdAt) / (1000 * 60 * 60);

              if (hoursSinceCreation > 24) {
                console.log(
                  `Payment ${orderId} is older than 24 hours, marking as expired`
                );

                // Update payment status to expired in orders object
                const orderUpdatePromise = admin
                  .database()
                  .ref(`orders/${orderId}`)
                  .update({
                    'payment.status': 'expired',
                    'payment.updatedAt': now.toISOString(),
                    'payment.expiredAt': now.toISOString(),
                    'payment.expirationReason':
                      'Scheduled function: Payment older than 24 hours',
                    paymentStatus: 'expired',
                    paymentExpiredAt: now.toISOString(),
                    paymentMethod: 'monobank'
                  });

                updatePromises.push(orderUpdatePromise);
                return;
              }

              // Check payment status with Monobank API
              if (payment.paymentId) {
                try {
                  const monobankToken = functions.config().monobank?.token;
                  if (!monobankToken) {
                    console.error(
                      'Monobank token not configured for scheduled function'
                    );
                    return;
                  }

                  const response = await axios.get(
                    `https://api.monobank.ua/api/merchant/payment/status?extPayId=${
                      payment.paymentId
                    }`,
                    {
                      headers: {
                        'X-Token': monobankToken
                      }
                    }
                  );

                  if (response.data && response.data.status) {
                    const newStatus = response.data.status;

                    if (newStatus !== payment.status) {
                      console.log(
                        `Payment ${orderId} status changed from ${
                          payment.status
                        } to ${newStatus}`
                      );

                      // Update payment status
                      const paymentUpdateData = {
                        'payment.status': newStatus,
                        'payment.updatedAt': now.toISOString(),
                        'payment.lastCheckedAt': now.toISOString(),
                        'payment.monobankStatusData': response.data
                      };

                      // Add specific fields based on status
                      if (newStatus === 'success') {
                        paymentUpdateData['payment.paidAt'] = now.toISOString();

                        // Update order status
                        const orderUpdatePromise = admin
                          .database()
                          .ref(`orders/${orderId}`)
                          .update({
                            paymentStatus: 'paid',
                            paidAt: now.toISOString(),
                            paymentId: payment.paymentId,
                            paymentMethod: 'monobank'
                          });

                        updatePromises.push(orderUpdatePromise);

                        // Send confirmation email to customer
                        try {
                          // Get customer email from order data
                          const orderRef = admin
                            .database()
                            .ref(`orders/${orderId}`);
                          const orderSnapshot = await orderRef.once('value');
                          const orderData = orderSnapshot.val();

                          const customerEmail =
                            orderData?.orderDescription?.email;

                          if (!customerEmail) {
                            console.log(
                              'No customer email found for order:',
                              orderId
                            );
                            // Skip sending email if no customer email
                            return;
                          }

                          const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                              user: 'kitschocolate@gmail.com',
                              pass: functions.config().email?.password
                            }
                          });

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
                              <p><strong>Номер замовлення:</strong> ${orderId}</p>
                              <p><strong>ID платежу:</strong> ${
                                payment.paymentId
                              }</p>
                              <p><strong>Сума:</strong> ${(
                                payment.amount / 100
                              ).toFixed(2)} ${payment.currency || 'UAH'}</p>
                              <p><strong>Спосіб оплати:</strong> Monobank</p>
                              <p><strong>Підтверджено:</strong> ${now.toLocaleString(
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
                          const customerMailOptions = {
                            html,
                            subject: 'Платіж підтверджено - Kits Chocolate',
                            to: customerEmail,
                            from: 'Kits Chocolate Website'
                          };

                          await new Promise((resolve, reject) => {
                            transporter.sendMail(
                              customerMailOptions,
                              (error, info) => {
                                if (error) {
                                  console.error(
                                    'Customer email sending error:',
                                    error
                                  );
                                  reject(error);
                                } else {
                                  console.log(
                                    'Customer confirmation email sent:',
                                    info.messageId
                                  );
                                  resolve(info);
                                }
                              }
                            );
                          });

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
                              <p><strong>Номер замовлення:</strong> ${orderId}</p>
                              <p><strong>ID платежу:</strong> ${
                                payment.paymentId
                              }</p>
                              <p><strong>Сума:</strong> ${(
                                payment.amount / 100
                              ).toFixed(2)} ${payment.currency || 'UAH'}</p>
                              <p><strong>Спосіб оплати:</strong> Monobank</p>
                              <p><strong>Клієнт:</strong> ${customerName}</p>
                              <p><strong>Email клієнта:</strong> ${customerEmail}</p>
                              <p><strong>Дата:</strong> ${now.toLocaleString(
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
                            subject: `Отримано новий платіж - Замовлення #${orderId}`,
                            to: 'kitscustomers@gmail.com',
                            from: 'Kits Chocolate Website'
                          };

                          await new Promise((resolve, reject) => {
                            transporter.sendMail(
                              adminMailOptions,
                              (error, info) => {
                                if (error) {
                                  console.error(
                                    'Admin email sending error:',
                                    error
                                  );
                                  reject(error);
                                } else {
                                  console.log(
                                    'Admin notification email sent:',
                                    info.messageId
                                  );
                                  resolve(info);
                                }
                              }
                            );
                          });
                        } catch (emailError) {
                          console.error(
                            'Failed to send confirmation email:',
                            emailError
                          );
                        }
                      } else if (newStatus === 'failure') {
                        paymentUpdateData[
                          'payment.failedAt'
                        ] = now.toISOString();

                        // Update order status
                        const orderUpdatePromise = admin
                          .database()
                          .ref(`orders/${orderId}`)
                          .update({
                            paymentStatus: 'failed',
                            paymentFailedAt: now.toISOString(),
                            paymentMethod: 'monobank'
                          });

                        updatePromises.push(orderUpdatePromise);
                      }

                      // Update payment status in orders object
                      const paymentUpdatePromise = admin
                        .database()
                        .ref(`orders/${orderId}`)
                        .update(paymentUpdateData);
                      updatePromises.push(paymentUpdatePromise);
                    } else {
                      // Status hasn't changed, just update last checked time
                      const updatePromise = admin
                        .database()
                        .ref(`orders/${orderId}`)
                        .update({
                          'payment.lastCheckedAt': now.toISOString()
                        });
                      updatePromises.push(updatePromise);
                    }
                  }
                } catch (apiError) {
                  console.error(
                    `Failed to check payment ${orderId} with Monobank API:`,
                    apiError.message
                  );

                  // Update last checked time even if API call failed
                  const updatePromise = admin
                    .database()
                    .ref(`orders/${orderId}`)
                    .update({
                      'payment.lastCheckedAt': now.toISOString(),
                      'payment.lastCheckError': apiError.message
                    });
                  updatePromises.push(updatePromise);
                }
              }
            } catch (paymentError) {
              console.error(
                `Error processing payment ${orderId}:`,
                paymentError.message
              );
            }
          }
        )
      );

      // Wait for all updates to complete
      if (updatePromises.length > 0) {
        await Promise.all(updatePromises);
        console.log(`Updated ${updatePromises.length} payment/order records`);
      }

      console.log('Scheduled payment status check completed successfully');
      return null;
    } catch (error) {
      console.error('Scheduled payment status check failed:', error);
      throw error;
    }
  });

// Scheduled Function to Clean Up Old Payments (runs daily at 2 AM)
exports.cleanupOldPaymentsScheduled = functions.pubsub
  .schedule('0 2 * * *')
  .timeZone('Europe/Kiev')
  .onRun(async context => {
    try {
      console.log('Starting scheduled cleanup of old payments...');

      const ordersRef = admin.database().ref('orders');
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      // Get orders with payments older than 30 days
      const snapshot = await ordersRef
        .orderByChild('payment/createdAt')
        .endAt(thirtyDaysAgo.toISOString())
        .once('value');

      const oldOrders = snapshot.val();

      if (!oldOrders) {
        console.log('No old orders with payments found for cleanup');
        return null;
      }

      console.log(
        `Found ${
          Object.keys(oldOrders).length
        } old orders with payments for cleanup`
      );

      // Archive old orders instead of deleting them
      const archivePromises = [];

      for (const [orderId, orderData] of Object.entries(oldOrders)) {
        try {
          // Move to archived_orders collection
          const archivedOrderRef = admin
            .database()
            .ref(`archived_orders/${orderId}`);
          await archivedOrderRef.set({
            ...orderData,
            archivedAt: now.toISOString(),
            originalPath: `orders/${orderId}`
          });

          // Remove from active orders
          const removePromise = ordersRef.child(orderId).remove();
          archivePromises.push(removePromise);
        } catch (archiveError) {
          console.error(
            `Failed to archive order ${orderId}:`,
            archiveError.message
          );
        }
      }

      // Wait for all archive operations to complete
      if (archivePromises.length > 0) {
        await Promise.all(archivePromises);
        console.log(`Archived ${archivePromises.length} old orders`);
      }

      console.log('Scheduled cleanup completed successfully');
      return null;
    } catch (error) {
      console.error('Scheduled cleanup failed:', error);
      throw error;
    }
  });

// Scheduled Function to Send Payment Reminders (runs every hour)
exports.sendPaymentRemindersScheduled = functions.pubsub
  .schedule('0 * * * *')
  .timeZone('Europe/Kiev')
  .onRun(async context => {
    try {
      console.log('Starting scheduled payment reminders...');

      const ordersRef = admin.database().ref('orders');
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

      // Get orders with pending payments created more than 1 hour ago
      const snapshot = await ordersRef
        .orderByChild('payment/status')
        .equalTo('pending')
        .once('value');

      const ordersWithPendingPayments = snapshot.val();

      if (!ordersWithPendingPayments) {
        console.log('No pending payments found for reminders');
        return null;
      }

      let reminderCount = 0;

      for (const [orderId, orderData] of Object.entries(
        ordersWithPendingPayments
      )) {
        const { payment } = orderData;
        try {
          const createdAt = new Date(payment.createdAt);
          const hoursSinceCreation = (now - createdAt) / (1000 * 60 * 60);

          // Send reminder if payment is older than 1 hour and less than 24 hours
          if (hoursSinceCreation >= 1 && hoursSinceCreation < 24) {
            // Check if we already sent a reminder recently
            const lastReminderSent = payment.lastReminderSent
              ? new Date(payment.lastReminderSent)
              : null;
            const hoursSinceLastReminder = lastReminderSent
              ? (now - lastReminderSent) / (1000 * 60 * 60)
              : 24;

            // Send reminder if we haven't sent one in the last 2 hours
            if (hoursSinceLastReminder >= 2) {
              console.log(`Sending reminder for payment ${orderId}`);

              // Update last reminder sent time
              await ordersRef.child(orderId).update({
                'payment.lastReminderSent': now.toISOString(),
                'payment.reminderCount': (payment.reminderCount || 0) + 1
              });

              reminderCount++;
            }
          }
        } catch (reminderError) {
          console.error(
            `Failed to process reminder for payment ${orderId}:`,
            reminderError.message
          );
        }
      }

      console.log(`Sent ${reminderCount} payment reminders`);
      return null;
    } catch (error) {
      console.error('Scheduled payment reminders failed:', error);
      throw error;
    }
  });
