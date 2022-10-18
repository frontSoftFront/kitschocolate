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
  loginId: '',
  password: ''
};

const validationSchema = Yup.object().shape({
  loginId: Yup.string().required('Field is Required'),
  password: Yup.string().required('Field is Required')
});

const AuthForm = ({ router }) => {
  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={({ loginId, password }) => {
          if (R.and(R.equals(loginId, 'admin'), R.equals(password, 'admin'))) {
            return router.push('/constructor');
          }

          showToastifyMessage('bad credentials', 'error');
        }}
      >
        {() => (
          <Form>
            <FieldGroup type="text" id="loginId" label="User Name" />
            <FieldGroup type="text" id="password" label="Password" />
            <Button
              {...Theme.styles.actionButton}
              mt={25}
              height={50}
              width="100%"
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
