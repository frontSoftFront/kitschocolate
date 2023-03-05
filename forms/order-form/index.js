import * as R from 'ramda';
import * as Yup from 'yup';
import { createHmac } from 'crypto';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useFirebase, actionTypes } from 'react-redux-firebase';
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
      Склад замовлення
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
              <Text mt={10} fontWeight={500}>
                {price} грн
              </Text>
              <Text mt={10} fontWeight={500}>
                {quantity} шт.
              </Text>
              <Text mt={10} fontWeight={500}>
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
      fontFamily="Poppins, sans-serif"
      color={Theme.colors.lightSlateGrey}
    >
      Оберіть метод оплати
    </Text>
    <Flex alignItems="stretch" justifyContent="space-between">
      <FieldComponent
        value="cash"
        type="radio"
        id="paymentType1"
        name="paymentType"
      />
      <Label width="30%" htmlFor="paymentType1">
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
              fontFamily="Poppins, sans-serif"
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
              fontFamily="Poppins, sans-serif"
            >
              Карткою (онлайн)
            </ArticleTitle>
            <Text mt="5px" fontSize={10} textAlign="justify">
              За підтримкою WayForPay
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
      <Label width="30%" htmlFor="paymentType3">
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
              fontFamily="Poppins, sans-serif"
            >
              Інший
            </ArticleTitle>
            <Text mt="5px" fontSize={10} textAlign="justify">
              Номер карти приватбанку буде відправлен в СМС
            </Text>
          </Article>
        </Box>
      </Label>
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
  call: true,
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

const handleSubmit = async props => {
  {
    const {
      call,
      total,
      order,
      email,
      orderId,
      comments,
      dispatch,
      lastName,
      firstName,
      warehouse,
      paymentType,
      phoneNumber,
      shippingCity
    } = props;

    const clientFields = JSON.stringify(getClientFields(props));

    localStorage.setItem('clientFields', clientFields);

    const acceptedDate = new Date().toLocaleString();
    const shipTo = `${shippingCity.label} ${warehouse.label}`;

    if (R.equals(paymentType, 'card')) {
      // const data = {}

      const items = R.values(R.pathOr({}, ['items'], order));

      const productName = R.map(R.prop('title'), items);
      const productPrice = R.map(R.prop('price'), items);
      const productCount = R.map(R.prop('quantity'), items);

      const url = 'https://secure.wayforpay.com/pay';
      let data = {
        productName,
        productCount,
        productPrice,
        amount: total,
        currency: 'UAH',
        orderReference: orderId,
        orderDate: 1415379863,
        merchantAccount: 'test_merch_n1',
        // merchantAccount: 'kitschocolate_eight_vercel_app',
        merchantDomainName: 'https://kitschocolate-eight.vercel.app'
      };

      const makeString = fields =>
        R.compose(
          R.join(';'),
          R.values,
          R.pick(fields)
        )(data);

      const string = `${makeString([
        'merchantAccount',
        'merchantDomainName',
        'orderReference',
        'amount',
        'currency'
      ])};${R.join(';', productName)};${R.join(';', productCount)};${R.join(
        ';',
        productPrice
      )}`;

      const merchantSignature = createHmac(
        'md5',
        '15bc1b3b6a30ee5a220e0be952838afdd3c78c80'
      )
        .update(string)
        .digest('hex');


      data = R.assoc('merchantSignature', merchantSignature, data);

      const payload = new window.FormData();

      R.forEachObjIndexed(
        (value, key) => payload.append(key, value),
        data,
        // R.omit(['productName', 'productCount', 'productPrice'], data)
      );

      // payload.append('productName[]', R.head(productName));
      // payload.append('productPrice[]', R.head(productPrice));
      // payload.append('productCount[]', R.head(productCount));

      const options = {
        method: 'POST',
        body: payload
      };

      // window.open(`https://secure.wayforpay.com/page?vkh=${merchantSignature}`);

      // return;
      fetch(url, options)
        .then(res => {
          console.log('res', res)
          if (res.status === 200) {
            showToastifyMessage('Success');

            debugger
            // dispatch({
            //   data,
            //   type: actionTypes.SET,
            //   path: `orders.${orderId}`
            // });
          }
        })
        .catch(error => {
          console.log('error', error);
          showToastifyMessage('Something is wrong', 'error');
        });

        // debugger

      return;
    }

    const data = R.merge(order, {
      total,
      shipTo,
      orderId,
      acceptedDate,
      status: 'COMPLETED',
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

    debugger;

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
          dispatch({
            data,
            type: actionTypes.SET,
            path: `orders.${orderId}`
          });
        }
      })
      .catch(error => {
        console.log('error', error);
        showToastifyMessage('Something is wrong', 'error');
      });
  }
};

const OrderForm = ({ order, orderId }) => {
  // const firebase = useFirebase();
  const dispatch = useDispatch();

  const orderComposition = R.values(order.items);
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

  if (false) {
    return (
      <form method="post" action="https://secure.wayforpay.com/pay" accept-charset="utf-8">
        <input name="merchantAccount" value="kitschocolate_eight_vercel_app" />
        <input name="merchantAuthType" value="SimpleSignature" />
        <input name="merchantDomainName" value="https://kitschocolate-eight.vercel.app" />
        <input name="orderReference" value="-NPm7eq_ZqkD995a3vKl" />
        <input name="orderDate" value="05/03/2023, 16:50:36" />
        <input name="amount" value="78" />
        <input name="currency" value="UAH" />
        <input name="orderTimeout" value="49000" />
        <input name="productName[]" value="Молочний Шоколад з Кокосом" />
        {/* <input name="productName[]" value="Память Kingston DDR3-1600 4096MB PC3-12800" /> */}
        <input name="productPrice[]" value="78" />
        {/* <input name="productPrice[]" value="547.36" /> */}
        <input name="productCount[]" value="1" />
        {/* <input name="productCount[]" value="1" /> */}
        <input name="clientFirstName" value="Вася" />
        <input name="clientLastName" value="Пупкин" />
        <input name="clientAddress" value="пр. Гагарина, 12" />
        <input name="clientCity" value="Днепропетровск" />
        <input name="clientEmail" value="some@mail.com" />
        <input name="defaultPaymentSystem" value="card" />
        <input name="merchantSignature" value="bb239a265729f1077aa75cee4f1ec5cc" />
        <input type="submit" value="Test" />
      </form>
    )
  }

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values =>
          handleSubmit({ ...values, order, total, orderId, dispatch })
        }
      >
        {({ values }) => (
          <Form acceptCharset="utf-8">
            <Flex>
              <Box width="50%">
                <Section>
                  <SectionTitle {...Theme.styles.formSectionTitle}>
                    Контактна інформація
                  </SectionTitle>
                  <FieldGroup id="firstName" label="First Name" />
                  <FieldGroup id="lastName" label="Last Name" />
                  <FieldGroup id="phoneNumber" label="Phone Number" />
                  <FieldGroup id="email" label="Email" />
                  <Flex
                    mt={15}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Label htmlFor="call">
                      Прошу перетелефонувати мені для уточнення замовлення
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
                ml={30}
                pl={30}
                width="50%"
                borderLeft="1px solid"
                borderColor={Theme.colors.lightGrey}
              >
                <OrderComposition orderComposition={orderComposition} />
                <Section mt={50}>
                  <SectionTitle {...Theme.styles.formSectionTitle}>
                    Разом до сплати
                  </SectionTitle>
                  <Box
                    borderBottom="1px solid"
                    borderColor={Theme.colors.lightGrey}
                  >
                    <Flex
                      py={15}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text color={Theme.colors.lightSlateGrey}>
                        {totalQuantity} товарів на суму
                      </Text>
                      <Text fontWeight={500}>{total} грн</Text>
                    </Flex>
                    <Flex
                      py={15}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text color={Theme.colors.lightSlateGrey}>
                        Вартість доставки
                      </Text>
                      <Text fontWeight={500}>50 грн</Text>
                    </Flex>
                  </Box>
                  <Flex
                    py={25}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text color={Theme.colors.lightSlateGrey}>
                      Разом до сплати
                    </Text>
                    <Text
                      fontSize={18}
                      fontWeight="bold"
                      color={Theme.colors.mainBlack}
                    >
                      {R.add(total, 50)} грн
                    </Text>
                  </Flex>
                  <Button
                    {...Theme.styles.actionButton}
                    mx="auto"
                    width={250}
                    height={50}
                    type="submit"
                  >
                    Підтвердити замовлення
                  </Button>
                </Section>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default OrderForm;
