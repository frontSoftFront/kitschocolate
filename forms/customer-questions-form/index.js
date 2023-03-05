import * as R from 'ramda';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useFirebase } from 'react-redux-firebase';
// helpers
import { isNilOrEmpty, showToastifyMessage } from '../../helpers';
// theme
import Theme from '../../theme';
// ui
import { Box, Button } from '../../ui';
// forms
import { FieldGroup } from '..';
// //////////////////////////////////////////////////

const initialValues = {
  email: '',
  question: ''
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('email')
    .required('Field is Required'),
  question: Yup.string()
    .max(500, 'max 500')
    .required('Field is Required')
});

const getInitialValues = () => {
  const clientFields = localStorage.getItem('clientFields');
  const email = R.pathOr(
    localStorage.getItem('clientEmail'),
    ['email'],
    JSON.parse(clientFields)
  );

  if (isNilOrEmpty(email)) return initialValues;

  return R.assoc('email', email, initialValues);
};

const CustomerQuestionsForm = () => {
  const firebase = useFirebase();

  return (
    <Box>
      <Formik
        initialValues={getInitialValues()}
        validationSchema={validationSchema}
        onSubmit={async ({ email, question }, { resetForm }) => {
          const date = new Date().toLocaleString();
          const ref = firebase
            .database()
            .ref()
            .child('customer-questions')
            .push();

          await ref
            .set({ date, email, question })
            .then(() => {
              showToastifyMessage('success');
              resetForm();
              localStorage.setItem('clientEmail', email);
            })
            .catch(error => {
              showToastifyMessage('error', 'error');
              console.log(
                '----------------CustomerQuestionsForm-------------------',
                error
              );
            });
        }}
      >
        {() => (
          <Form>
            <FieldGroup
              id="email"
              type="text"
              label="What's your email address?"
            />
            <FieldGroup
              id="question"
              type="textarea"
              label="Do you have any question?"
            />
            <Button
              {...Theme.styles.actionButton}
              mt={25}
              ml="auto"
              width={170}
              height={50}
            >
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CustomerQuestionsForm;
