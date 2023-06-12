import * as R from 'ramda';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useFirebase } from 'react-redux-firebase';
// helpers
import { showToastifyMessage } from '../../helpers';
// theme
import Theme from '../../theme';
// ui
import { Box, Button } from '../../ui';
// forms
import { FieldGroup } from '..';
// //////////////////////////////////////////////////

const initialValues = {
  email: '',
  password: ''
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Field is Required'),
  password: Yup.string().required('Field is Required')
});

const AuthForm = ({ router }) => {
  const firebase = useFirebase();

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async ({ email, password }) => {
          if (R.and(R.equals(email, 'admin'), R.equals(password, 'admin'))) {
            router.push('/constructor');
          } else {
            showToastifyMessage('bad credentials', 'error');
          }
        }}
      >
        {() => (
          <Form>
            <FieldGroup type="text" id="email" label="Email" />
            <FieldGroup type="text" id="password" label="Password" />
            <Button
              {...Theme.styles.actionButton}
              mt={25}
              height={50}
              width="100%"
              type="submit"
            >
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AuthForm;
