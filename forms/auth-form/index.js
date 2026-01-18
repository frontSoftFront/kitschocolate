import * as Yup from 'yup';
import { useCallback } from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
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

const AuthForm = () => {
  const firebase = useFirebase();

  const { push } = useRouter();

  const handleSubmit = useCallback(async ({ email, password }) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      // .login({ email, password })
      .then(() => push('/constructor'))
      .catch(() => showToastifyMessage('Error', 'error'));
  }, []);

  return (
    <Box>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
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
