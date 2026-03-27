import * as R from 'ramda';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { actionTypes } from 'react-redux-firebase';
// lib
import { basketActions } from '../../lib/redux';
// helpers
import { isNilOrEmpty, showToastifyMessage } from '../../helpers';
// theme
import Theme from '../../theme';
// ui
import {
  Img,
  Box,
  Flex,
  Text,
  Button,
  Section,
  Article,
  ArticleTitle,
  SectionTitle
} from '../../ui';
// forms
import { Label } from '../ui';
import { FieldGroup, FieldComponent } from '..';
// //////////////////////////////////////////////////

const OrderComposition = ({ orderComposition }) => (
  <Section>
    <SectionTitle {...Theme.styles.formSectionTitle}>
      Ваше замовлення
    </SectionTitle>
    {orderComposition.map(
      ({ id, title, imgUrl, price, quantity, subtotal }) => (
        <Flex
          py={15}
          key={id}
          alignItems="center"
          borderBottom="1px solid"
          borderColor={Theme.colors.lightGrey}
        >
          <Img height={70} src={imgUrl} />
          <Article ml={15} height="max-content">
            <ArticleTitle
              fontSize={14}
              fontWeight="bold"
              color={Theme.colors.congoBrown}
            >
              {title}
            </ArticleTitle>
            <Flex justifyContent="space-between">
              <Text ml="5px" mt={10} fontWeight={500}>
                {price} грн
              </Text>
              <Text ml="5px" mt={10} fontWeight={500}>
                {quantity} шт.
              </Text>
              <Text ml="5px" mt={10} fontWeight={500}>
                {subtotal} грн
              </Text>
            </Flex>
          </Article>
        </Flex>
      )
    )}
  </Section>
);

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .nullable(true)
    .email('email'),
  lastName: Yup.string()
    .nullable(true)
    .required('Field is required'),
  warehouse: Yup.string()
    .nullable(true)
    .required('Field is required'),
  firstName: Yup.string()
    .nullable(true)
    .required('Field is required'),
  phoneNumber: Yup.string()
    .nullable(true)
    .required('Field is required'),
  shippingCity: Yup.string()
    .nullable(true)
    .required('Field is required')
});

const PaymentTypes = ({ paymentType }) => (
  <Box mt={15}>
    <Text fontWeight={600} color={Theme.colors.lightSlateGrey}>
      Оберіть метод оплати
    </Text>
    <Flex alignItems="stretch" flexWrap="wrap" gap={10}>
      <FieldComponent
        value="cash"
        type="radio"
        id="paymentType1"
        name="paymentType"
      />
      <Label mt={10} pl="0px" mr={12} width={160} htmlFor="paymentType1">
        <Box
          p={10}
          height="100%"
          borderRadius="8px"
          border="2px solid"
          transition="all .3s ease"
          boxShadow="rgb(0 0 0 / 8%) 0px 4px 8px"
          borderColor={
            R.equals(paymentType, 'cash')
              ? Theme.colors.green
              : Theme.colors.lightGrey
          }
        >
          <Article color={Theme.colors.mainBlack}>
            <ArticleTitle fontSize={14} fontWeight={600}>
              Оплата при отриманні
            </ArticleTitle>
          </Article>
        </Box>
      </Label>
      <FieldComponent
        type="radio"
        value="monobank"
        id="paymentType2"
        name="paymentType"
      />
      <Label pl="0px" mt={10} width={160} htmlFor="paymentType2">
        <Box
          p={10}
          height="100%"
          borderRadius="8px"
          border="2px solid"
          transition="all .3s ease"
          boxShadow="rgb(0 0 0 / 8%) 0px 4px 8px"
          borderColor={
            R.equals(paymentType, 'monobank')
              ? Theme.colors.green
              : Theme.colors.lightGrey
          }
        >
          <Article color={Theme.colors.mainBlack}>
            <ArticleTitle fontSize={14} fontWeight={600}>
              Карткою (Monobank)
            </ArticleTitle>
            {/* <Text mt="5px" fontSize={10} textAlign="justify">
              За підтримкою Liqpay
            </Text> */}
            <Flex mt={15} height={20} justifyContent="space-between">
              <Img width="21%" height="100%" src="../../master-card.svg" />
              <Img width="21%" height="100%" src="../../visa.svg" />
              <Img width="21%" height="100%" src="../../apple-pay.svg" />
              <Img width="21%" height="100%" src="../../google-pay.svg" />
            </Flex>
          </Article>
        </Box>
      </Label>
      {/* <FieldComponent
        value="monobank"
        type="radio"
        id="paymentType3"
        name="paymentType"
      />
      <Label width={['100%', '48%', '30%']} htmlFor="paymentType3">
        <Box
          p={10}
          height="100%"
          borderRadius="8px"
          border="2px solid"
          transition="all .3s ease"
          boxShadow="rgb(0 0 0 / 8%) 0px 4px 8px"
          borderColor={
            R.equals(paymentType, 'monobank')
              ? Theme.colors.green
              : Theme.colors.lightGrey
          }
        >
          <Article color={Theme.colors.mainBlack}>
            <ArticleTitle fontSize={14} fontWeight={600}>
              Monobank
            </ArticleTitle>
            <Text mt="5px" fontSize={10} textAlign="justify">
              Безпечна оплата через Monobank
            </Text>
            <Text
              mt="5px"
              fontSize={10}
              textAlign="justify"
              color={Theme.colors.mediumWood}
            >
              Швидка оплата карткою Monobank
            </Text>
          </Article>
        </Box>
      </Label> */}
    </Flex>
  </Box>
);

const getClientFields = R.pick([
  'call',
  'email',
  'lastName',
  'warehouse',
  'firstName',
  'phoneNumber',
  'paymentType',
  'shippingCity'
]);

const defaultValues = {
  call: false,
  lastName: '',
  comments: '',
  warehouse: '',
  firstName: '',
  phoneNumber: '',
  shippingCity: '',
  paymentType: 'monobank',
  loadedWarehouse: false,
  email: ''
};

const getInitialValues = () => {
  const clientFields = localStorage.getItem('clientFields');

  if (isNilOrEmpty(clientFields)) return defaultValues;

  return R.merge(defaultValues, JSON.parse(clientFields));
};

const handleSubmit = (values, handlers) => {
  const {
    call,
    total,
    order,
    email,
    orderId,
    comments,
    lastName,
    firstName,
    warehouse,
    paymentType,
    phoneNumber,
    shippingCity,
    orderComposition
  } = values;

  const { push, dispatch, handleOpenLoader, handleCloseLoader } = handlers;

  handleOpenLoader();

  const clientFields = JSON.stringify(getClientFields(values));

  localStorage.setItem('clientFields', clientFields);

  const acceptedDate = new Date().toLocaleString();
  const shipTo = `${shippingCity.label} ${warehouse.label}`;

  const data = R.merge(order, {
    total,
    shipTo,
    orderId,
    paymentType,
    acceptedDate,
    status: 'ACCEPTED',
    orderDescription: {
      email,
      shipTo,
      comments,
      lastName,
      firstName,
      paymentType,
      phoneNumber,
      call: call ? 'Yes' : 'No'
    }
  });

  const handleAcceptOrder = async ({ shouldRedirect, redirectUrl } = {}) => {
    const url =
      'https://us-central1-kitschocolate-bc8f8.cloudfunctions.net/acceptOrder';
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    };

    fetch(url, options)
      .then(res => {
        if (res.status === 200) {
          showToastifyMessage('Success');

          dispatch(basketActions.setBasket(null));

          dispatch({
            data,
            type: actionTypes.SET,
            path: `orders.${orderId}`
          });
        }

        if (shouldRedirect) push(redirectUrl);
      })
      .catch(error => {
        console.log('error', error);
        showToastifyMessage('Something is wrong', 'error');
      })
      .finally(() => {
        handleCloseLoader();
      });
  };

  if (R.equals(paymentType, 'monobank')) {
    const createMonobankPayment = async () => {
      try {
        // Prepare basket order for Monobank
        const basketOrder = R.values(orderComposition).map(item => ({
          unit: 'шт',
          code: item.id,
          name: item.title,
          qty: item.quantity,
          price: Math.round(item.price * 100),
          sum: Math.round(item.subtotal * 100)
        }));

        const response = await fetch(
          'https://us-central1-kitschocolate-bc8f8.cloudfunctions.net/createMonobankPayment',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              orderId,
              amount: total,
              currency: 'UAH',
              webHookUrl:
                'https://us-central1-kitschocolate-bc8f8.cloudfunctions.net/monobankWebhook',
              redirectUrl: window.location.href,
              merchantPaymInfo: {
                reference: orderId,
                destination: 'Kits Chocolate Purchase',
                basketOrder
              }
            })
          }
        );

        const result = await response.json();

        if (result.success) {
          // Accept Order and Redirect to Monobank payment page
          handleAcceptOrder({
            shouldRedirect: true,
            redirectUrl: result.redirectUrl
          });
        } else {
          throw new Error(result.error || 'Payment creation failed');
        }
      } catch (error) {
        console.error('Monobank payment error:', error);
        showToastifyMessage('Помилка створення платежу', 'error');
      } finally {
        handleCloseLoader(false);
      }
    };

    createMonobankPayment();

    return;
  }

  handleAcceptOrder();
};

const PaymentButton = () => (
  <Button
    {...Theme.styles.actionButton}
    mx="auto"
    width={250}
    mt={[20, 0]}
    type="submit"
    height={[40, 50]}
  >
    Підтвердити замовлення
  </Button>
);

const OrderForm = ({ order, orderId, handleOpenLoader, handleCloseLoader }) => {
  const dispatch = useDispatch();

  const { push } = useRouter();

  const orderComposition = R.values(R.propOr({}, 'items', order));

  const total = R.compose(
    R.sum,
    R.values,
    R.map(R.prop('subtotal'))
  )(orderComposition);

  const totalQuantity = R.compose(
    R.sum,
    R.values,
    R.map(R.prop('quantity'))
  )(orderComposition);

  const initialValues = getInitialValues();

  // keep latest form state & submit status
  const formStateRef = useRef({ values: initialValues });
  const hasSubmittedRef = useRef(false);
  const hasSavedDraftRef = useRef(false);

  useEffect(() => {
    const handleSaveDraft = () => {
      if (hasSubmittedRef.current || hasSavedDraftRef.current) return;

      const formState = formStateRef.current;

      if (R.isNil(formState)) return;

      hasSavedDraftRef.current = true;

      // Save draft to Firebase via Cloud Function
      fetch(
        'https://us-central1-kitschocolate-bc8f8.cloudfunctions.net/saveOrderDraft',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderId,
            draftForm: formState
          })
        }
      ).catch(() => {
        // fail silently – this is only a draft
      });
    };

    window.addEventListener('beforeunload', handleSaveDraft);

    return () => {
      handleSaveDraft();
      window.removeEventListener('beforeunload', handleSaveDraft);
    };
  }, [dispatch, order, orderId]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        hasSubmittedRef.current = true;

        return handleSubmit(
          { ...values, order, total, orderId },
          { push, dispatch, handleOpenLoader, handleCloseLoader }
        );
      }}
    >
      {({ values, errors, touched, isValid, isSubmitting, submitCount }) => {
        // keep ref in sync with current Formik state
        formStateRef.current = {
          values,
          errors,
          touched,
          isValid,
          isSubmitting,
          submitCount
        };

        return (
          <Form>
            <Flex flexWrap="wrap" justifyContent="space-between">
              <Box width={['100%', '100%', '48%']}>
                <Section>
                  <SectionTitle {...Theme.styles.formSectionTitle}>
                    Контактна інформація
                  </SectionTitle>
                  <FieldGroup id="firstName" label="Ім'я" />
                  <FieldGroup id="lastName" label="Прізвище" />
                  <FieldGroup id="phoneNumber" label="Номер Телефону" />
                  <FieldGroup id="email" label="Email" />
                  <Flex
                    mt={15}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Label htmlFor="call">
                      Прошу зателефонувати мені для уточнення замовлення
                    </Label>
                    <FieldComponent id="call" type="toggle" />
                  </Flex>
                </Section>
                <Section mt={50}>
                  <SectionTitle {...Theme.styles.formSectionTitle}>
                    Доставка та оплата
                  </SectionTitle>
                  <FieldGroup
                    id="shippingCity"
                    type="searchCity"
                    label="Місто або населений пункт"
                  />
                  <FieldGroup
                    id="warehouse"
                    type="warehouse"
                    label="Номер відділення Новой Пошти"
                  />
                  <FieldGroup
                    id="comments"
                    type="textarea"
                    label="Коментар до замовлення"
                  />
                </Section>
                <PaymentTypes paymentType={values.paymentType} />
              </Box>
              <Box
                pl={[0, 0, 30]}
                mt={[20, 30, 0]}
                pt={[20, 30, 0]}
                width={['100%', '100%', '48%']}
                borderColor={Theme.colors.lightGrey}
                borderLeft={['none', 'none', '1px solid']}
                borderTop={['1px solid', '1px solid', 'none']}
              >
                <OrderComposition orderComposition={orderComposition} />
                <Section mt={Theme.styles.spacing.paddingY}>
                  <SectionTitle {...Theme.styles.formSectionTitle}>
                    Разом до сплати
                  </SectionTitle>
                  <Box
                    borderBottom="1px solid"
                    borderColor={Theme.colors.lightGrey}
                  >
                    <Flex
                      py={[10, 15]}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text color={Theme.colors.lightSlateGrey}>
                        {totalQuantity} товарів на суму
                      </Text>
                      <Text fontWeight={500}>{total} грн</Text>
                    </Flex>
                    {/* <Flex
                    py={[10, 15]}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text color={Theme.colors.lightSlateGrey}>
                      Вартість доставки
                    </Text>
                    <Text fontWeight={500}>50 грн</Text>
                  </Flex> */}
                  </Box>
                  <Flex
                    py={[15, 20, 25]}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text color={Theme.colors.lightSlateGrey}>
                      Разом до сплати
                    </Text>
                    <Text
                      fontWeight="bold"
                      fontSize={[16, 18]}
                      color={Theme.colors.mainBlack}
                    >
                      {/* {R.add(total, 50)} грн */}
                      {total} грн
                    </Text>
                  </Flex>
                  <PaymentButton />
                  {/* {R.propEq('paymentType', 'card1', values) ? (
                  <LiqPayPay
                    amount="1"
                    currency="UAH"
                    publicKey="sandbox_i60346112176"
                    description="Payment for product"
                    extra={[<PaymentButton key={1} />]}
                    product_description="Online courses"
                    server_url="http://server.domain.com/liqpay"
                    result_url="https://kitschocolate-eight.vercel.app/"
                    // result_url=''
                    orderId={Math.floor(1 + Math.random() * 900000000)}
                    privateKey="sandbox_tib5dHdlRVhmkOumo4Cx9UpbMr39Dmihj5bzTA4z"
                  />
                ) : R.propEq('paymentType', 'monobank', values) ? (
                  <MonobankPayment
                    orderId={orderId}
                    amount={total}
                    items={orderComposition}
                    handleOpenLoader={handleOpenLoader}
                    handleCloseLoader={handleCloseLoader}
                    onSuccess={result => {
                      console.log('Monobank payment created:', result);
                    }}
                    onError={error => {
                      console.error('Monobank payment error:', error);
                    }}
                  />
                ) : (
                  <PaymentButton />
                )} */}
                </Section>
              </Box>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OrderForm;
