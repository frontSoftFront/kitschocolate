import is from 'is_js';
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
import {
  fieldsMap,
  recipeFields,
  chocolateFields,
  questionAnswerFields
} from './field-settings';
// //////////////////////////////////////////////////

const getFormikOptions = (formType = 'chocolate') => {
  const formTypes = {
    recipe: recipeFields,
    chocolate: chocolateFields,
    questionsAnswers: questionAnswerFields
  };
  const getFieldKeysByFormType = R.path([formType], formTypes);
  const keys = R.map(R.prop('key'), getFieldKeysByFormType);
  const fields = R.map(
    ({ key, wrapperStyles = {} }) => ({
      ...R.path([key], fieldsMap),
      wrapperStyles
    }),
    getFieldKeysByFormType
  );
  const defaultValues = R.compose(
    R.map(({ type, arrayFields }) => {
      if (R.equals(type, 'toggle')) return false;
      if (R.equals(type, 'array')) {
        let fieldArrayInitialValues = R.of('');
        if (R.gt(R.length(arrayFields), 1)) {
          fieldArrayInitialValues = R.compose(
            R.of,
            R.map(({ defaultValue }) => R.or(defaultValue, '')),
            R.indexBy(R.prop('id'))
          )(arrayFields);
        }

        return fieldArrayInitialValues;
      }

      return '';
    }),
    R.pick(keys)
  )(fieldsMap);

  return { fields, defaultValues };
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Field is Required'),
  price: Yup.string().required('Field is Required'),
  quantity: Yup.string().required('Field is Required'),
  description: Yup.string().required('Field is Required')
});

const getOptions = ({ options }, optionsForSelect) => {
  if (is.array(options)) return options;

  return R.map(
    item => ({
      value: R.pathOr(item, ['id'], item),
      title: R.pathOr(item, ['title'], item),
      label: R.pathOr(item, ['imgUrl'], item)
    }),
    R.pathOr([], [options], optionsForSelect)
  );
};

const ItemForm = ({
  formType,
  submitAction,
  initialValues,
  optionsForSelect
}) => {
  const { fields, defaultValues } = getFormikOptions(formType);

  return (
    <Formik
      {...getFormikOptions()}
      // validationSchema={validationSchema}
      onSubmit={values => submitAction(values)}
      initialValues={R.merge(defaultValues, R.or(initialValues, {}))}
    >
      {({ values }) => (
        <Form>
          <Flex flexWrap="wrap" alignItems="center">
            {fields.map((item, index) => (
              <FieldGroup
                {...item}
                {...item.wrapperStyles}
                key={index}
                values={values}
                options={getOptions(item, optionsForSelect)}
                setOptionsForArray={field =>
                  getOptions(field, optionsForSelect)}
              />
            ))}
          </Flex>
          <Flex>
            <Button
              {...Theme.styles.actionButton}
              ml="auto"
              mt={25}
              height={50}
              width={300}
            >
              Add
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default ItemForm;
