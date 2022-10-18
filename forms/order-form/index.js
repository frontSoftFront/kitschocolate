import * as R from 'ramda';
import * as Yup from 'yup';
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

const OrderForm = ({ order, orderId }) => {
  const firebase = useFirebase();
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

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async values => {
          const clientFields = JSON.stringify(getClientFields(values));
          localStorage.setItem('clientFields', clientFields);
          const ref = firebase.database().ref(`orders/${orderId}`);
          const data = R.merge(order, {
            status: 'COMPLETED',
            orderDescription: values
          });
          await ref
            .update(data)
            .then(() => {
              showToastifyMessage('success');
              dispatch({
                data,
                type: actionTypes.SET,
                path: `orders.${orderId}`
              });
            })
            .catch(() => showToastifyMessage('orders', 'error'));
        }}
      >
        {({ values }) => (
          <Form>
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
