import * as R from 'ramda';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
// helpers
import { showToastifyMessage } from '../../helpers';
// theme
import Theme from '../../theme';
// ui
import { Box, Flex, Button } from '../../ui';
// forms
import { FieldGroup } from '..';
// //////////////////////////////////////////////////

const initialValues = {
  title: '',
  price: '',
  quantity: '',
  active: true,
  description: ''
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Field is Required'),
  price: Yup.string().required('Field is Required'),
  quantity: Yup.string().required('Field is Required'),
  description: Yup.string().required('Field is Required')
});

const ItemForm = ({ router }) => {
  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={({ loginId, password }) => {
          if (R.and(R.equals(loginId, 'admin'), R.equals(password, 'admin'))) {
            return router.push('/constructor');
          }

          return showToastifyMessage('bad credentials', 'error');
        }}
      >
        {() => (
          <Form>
            <Flex flexWrap="wrap">
              <FieldGroup
                mr={20}
                width={100}
                id="active"
                type="toggle"
                label="Active"
              />
              <FieldGroup
                mr={20}
                width={250}
                type="text"
                id="title"
                label="Title"
              />
              <FieldGroup
                mr={20}
                width={250}
                type="number"
                id="price"
                label="Price"
              />
              <FieldGroup
                mr={20}
                width={250}
                type="number"
                id="quantity"
                label="Quantity"
              />
              <FieldGroup
                mr={20}
                width={400}
                id="imgUrl"
                type="number"
                label="Item Image"
              />
              <FieldGroup
                mr={20}
                width={400}
                type="number"
                id="extraImages"
                label="Extra Images"
              />
              <FieldGroup
                width="100%"
                type="textarea"
                id="description"
                label="Description"
              />
            </Flex>
            <Flex>
              <Button
                {...Theme.styles.actionButton}
                mt={25}
                ml="auto"
                height={50}
                width={300}
              >
                Add
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ItemForm;
