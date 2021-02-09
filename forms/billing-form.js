import { useField } from 'formik';

const TextInput = ({ fieldName }) => {
  const [meta, helpers] = useField(fieldName);

  return <input id={fieldName} />;
};

export default TextInput;
