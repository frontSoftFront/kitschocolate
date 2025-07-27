import * as R from 'ramda';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { LiqPayPay } from 'react-liqpay';
import { useDispatch } from 'react-redux';
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
    <Text
      mb={10}
      fontWeight={600}
      // fontFamily="Poppins, sans-serif"
      color={Theme.colors.lightSlateGrey}
    >
      Оберіть метод оплати
    </Text>
    <Flex alignItems="stretch">
      <FieldComponent
        value="cash"
        type="radio"
        id="paymentType1"
        name="paymentType"
      />
      <Label pl="0px" width="30%" htmlFor="paymentType1">
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
            <ArticleTitle
              fontSize={14}
              fontWeight={600}
              // fontFamily="Poppins, sans-serif"
            >
              Готівкою
            </ArticleTitle>
            <Text mt="5px" fontSize={10} textAlign="justify">
              Наложений платіж за допомогою Нової Пошти
            </Text>
            <Text
              mt="5px"
              fontSize={10}
              textAlign="justify"
              color={Theme.colors.mediumWood}
            >
              Опція оплати доступна на замовлення від 400 грн
            </Text>
          </Article>
        </Box>
      </Label>
      <FieldComponent
        value="card"
        type="radio"
        id="paymentType2"
        name="paymentType"
      />
      <Label width="30%" htmlFor="paymentType2">
        <Box
          p={10}
          height="100%"
          borderRadius="8px"
          border="2px solid"
          transition="all .3s ease"
          boxShadow="rgb(0 0 0 / 8%) 0px 4px 8px"
          borderColor={
            R.equals(paymentType, 'card')
              ? Theme.colors.green
              : Theme.colors.lightGrey
          }
        >
          <Article color={Theme.colors.mainBlack}>
            <ArticleTitle
              fontSize={14}
              fontWeight={600}
              // fontFamily="Poppins, sans-serif"
            >
              Карткою (онлайн)
            </ArticleTitle>
            <Text mt="5px" fontSize={10} textAlign="justify">
              За підтримкою Liqpay
            </Text>
            <Flex mt={15} height={20} justifyContent="space-between">
              <Img width="21%" height="100%" src="../../master-card.svg" />
              <Img width="21%" height="100%" src="../../visa.svg" />
              <Img width="21%" height="100%" src="../../apple-pay.svg" />
              <Img width="21%" height="100%" src="../../google-pay.svg" />
            </Flex>
          </Article>
        </Box>
      </Label>
      <FieldComponent
        type="radio"
        value="another"
        id="paymentType3"
        name="paymentType"
      />
      {/* <Label width="30%" htmlFor="paymentType3">
        <Box
          p={10}
          height="100%"
          borderRadius="8px"
          border="2px solid"
          transition="all .3s ease"
          boxShadow="rgb(0 0 0 / 8%) 0px 4px 8px"
          borderColor={
            R.equals(paymentType, 'another')
              ? Theme.colors.green
              : Theme.colors.lightGrey
          }
        >
          <Article color={Theme.colors.mainBlack}>
            <ArticleTitle
              fontSize={14}
              fontWeight={600}
              // fontFamily="Poppins, sans-serif"
            >
              Інший
            </ArticleTitle>
            <Text mt="5px" fontSize={10} textAlign="justify">
              Номер карти приватбанку буде відправлен в СМС
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
  email: '',
  call: false,
  lastName: '',
  comments: '',
  warehouse: '',
  firstName: '',
  phoneNumber: '',
  shippingCity: '',
  paymentType: 'cash',
  loadedWarehouse: false
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
    shippingCity
  } = values;

  const { dispatch, handleOpenLoader, handleCloseLoader } = handlers;

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

      handleCloseLoader();
    })
    .catch(error => {
      handleCloseLoader();
      console.log('error', error);
      showToastifyMessage('Something is wrong', 'error');
    });
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values =>
        handleSubmit(
          { ...values, order, total, orderId },
          { dispatch, handleOpenLoader, handleCloseLoader }
        )
      }
    >
      {({ values }) => (
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
                {R.propEq('paymentType', 'card', values) ? (
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
                ) : (
                  <PaymentButton />
                )}
              </Section>
            </Box>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default OrderForm;
