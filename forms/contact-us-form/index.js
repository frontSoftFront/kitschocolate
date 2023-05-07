import * as R from 'ramda';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
// helpers
import { isNilOrEmpty, showToastifyMessage } from '../../helpers';
// theme
import Theme from '../../theme';
// ui
import { Flex, Button } from '../../ui';
// forms
import { FieldGroup } from '..';
// //////////////////////////////////////////////////

const initialValues = {
  name: '',
  email: '',
  phone: '',
  customerUrl: '',
  companyName: '',
  description: ''
};

const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

const validationSchema = () =>
  Yup.lazy(({ email, phone }) => {
    let schema = {
      email: Yup.string().email('email'),
      description: Yup.string().max(1000, 'max 1000'),
      name: Yup.string().required('Field is Required'),
      companyName: Yup.string().required('Field is Required'),
      phone: Yup.string().matches(phoneRegex, 'Not valid Phone Number')
    };

    if (R.and(isNilOrEmpty(email), isNilOrEmpty(phone))) {
      schema = {
        ...schema,
        phone: Yup.string()
          .required('Field is Required')
          .matches(phoneRegex, 'Not valid Phone Number'),
        email: Yup.string()
          .email('email')
          .required('Field is Required')
      };
    }

    return Yup.object().shape(schema);
  });

const handleSubmit = async (values, handleCloseModal) => {
  const data = R.map(item => (isNilOrEmpty(item) ? '-' : item), values);
  const url =
    'https://us-central1-kitschocolate-bc8f8.cloudfunctions.net/contactUs';
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
        handleCloseModal();
        showToastifyMessage('Success');
      }
    })
    .catch(error => {
      console.log('error', error);
      showToastifyMessage('Something is wrong', 'error');
    });
};

const ContactUsForm = ({ handleCloseModal }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={values => handleSubmit(values, handleCloseModal)}
  >
    {() => (
      <Form>
        <Flex
          flexWrap="wrap"
          alignItems="stretch"
          justifyContent="space-between"
        >
          <FieldGroup
            id="name"
            type="text"
            label="Ваше ім’я"
            width={['100%', '48%']}
          />
          <FieldGroup
            id="phone"
            type="text"
            fieldGroupMT={10}
            width={['100%', '48%']}
            label="Контактний телефон"
          />
          <FieldGroup
            id="email"
            type="text"
            fieldGroupMT={10}
            width={['100%', '48%']}
            label="Електронна пошта"
          />
          <FieldGroup
            type="text"
            id="companyName"
            fieldGroupMT={10}
            width={['100%', '48%']}
            label="Яку компанію ви представляєте?"
          />
          <FieldGroup
            id="url"
            type="text"
            fieldGroupMT={10}
            width={['100%', '48%']}
            label="Ваш сайт чи сторінка у соціальних мережах?"
          />
        </Flex>
        <FieldGroup
          type="textarea"
          id="description"
          fieldGroupMT={10}
          label="Чим ми можемо бути вам корисні?"
        />
        <Button
          {...Theme.styles.actionButton}
          mt={15}
          ml="auto"
          width={150}
          height={40}
          type="submit"
        >
          Send
        </Button>
      </Form>
    )}
  </Formik>
);

export default ContactUsForm;
