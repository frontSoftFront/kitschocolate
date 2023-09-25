import is from 'is_js';
import * as R from 'ramda';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
// theme
import Theme from '../../theme';
// ui
import { Flex, Button } from '../../ui';
// forms
import { FieldGroup } from '..';
import {
  fieldsMap,
  recipeFields,
  imagesFields,
  categoryFields,
  chocolateFields,
  questionAnswerFields
} from './field-settings';
// //////////////////////////////////////////////////

const getFormikOptions = (formType = 'chocolate') => {
  const formTypes = {
    recipe: recipeFields,
    images: imagesFields,
    category: categoryFields,
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

  const validationSchemaObject = R.map(
    () => Yup.string().required('required'),
    defaultValues
  );

  return { fields, defaultValues, validationSchemaObject };
};

const getOptions = ({ options, useLabelAsTitle }, optionsForSelect) => {
  if (is.array(options)) return options;

  return R.map(
    item => ({
      value: R.pathOr(item, ['id'], item),
      title: R.pathOr(item, ['title'], item),
      label:
        useLabelAsTitle === true
          ? R.pathOr(item, ['title'], item)
          : R.pathOr(item, ['imgUrl'], item)
    }),
    R.pathOr([], [options], optionsForSelect)
  );
};

const ItemForm = ({
  formType,
  uploadUrl,
  submitAction,
  initialValues,
  optionsForSelect,
  useSubmitBtn = true
}) => {
  const { fields, defaultValues, validationSchemaObject } = getFormikOptions(
    formType
  );

  return (
    <Formik
      {...getFormikOptions()}
      onSubmit={submitAction}
      validationSchema={Yup.object().shape(validationSchemaObject)}
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
                uploadUrl={uploadUrl}
                options={getOptions(item, optionsForSelect)}
                setOptionsForArray={field =>
                  getOptions(field, optionsForSelect)
                }
              />
            ))}
          </Flex>
          {useSubmitBtn && (
            <Button
              {...Theme.styles.actionButton}
              ml="auto"
              mt={25}
              height={50}
              width={300}
              // type="submit"
            >
              Submit
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ItemForm;
