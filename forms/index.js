import is from 'is_js';
import * as R from 'ramda';
import Select from 'react-select';
import Toggle from 'react-toggle';
import { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import Dropzone from 'react-dropzone-uploader';
import { Field, FieldArray, ErrorMessage } from 'formik';
// forms
import { renderBorderColor } from './helpers';
// helpers
import {
  setDebounce,
  isNilOrEmpty,
  showToastifyMessage,
  isNotNilAndNotEmpty
} from '../helpers';
// icons
import Icon from '../icons';
// ui
import { Box, Flex } from '../ui';
// forms
import { Label, Input, Error, TextArea, InputWrapper } from './ui';
// //////////////////////////////////////////////////

const RadioField = ({ form, field, ...props }) => (
  <Input {...form} {...field} {...props} type="radio" display="none" />
);

const TextField = ({ form, field, ...props }) => (
  <Input {...form} {...field} {...props} />
);

const NumberField = ({ form, field, ...props }) => (
  <Input {...form} {...field} {...props} type="number" />
);

const TextAreaField = ({ form, field, ...props }) => (
  <TextArea {...form} {...field} {...props} />
);

const ToggleField = ({ field }) => (
  <Toggle
    {...R.dissoc('value', field)}
    icons={false}
    id={field.name}
    checked={field.value}
  />
);

const getCityOptions = (inputValue, callback) => {
  if (isNilOrEmpty(inputValue)) return;
  const options = {
    modelName: 'Address',
    calledMethod: 'getCities',
    apiKey: '06cc39a880ff8afeb7ebf9e5828f8e66', // NOTE: expires on 	26.02.2024 14:13:20
    methodProperties: {
      FindByString: inputValue
    }
  };
  const url = 'https://api.novaposhta.ua/v2.0/json/Address/getCities';
  fetch(url, { method: 'POST', body: JSON.stringify(options) })
    .then(res => res.json())
    .then(({ data }) => {
      const cities = R.map(
        ({ Ref, Description }) => ({ value: Ref, label: Description }),
        data
      );
      callback(cities);
    });
};

const SearchCityField = ({ form, field }) => {
  const {
    values,
    errors,
    touched,
    setValues,
    setFieldValue,
    setFieldTouched
  } = form;

  const fieldName = field.name;
  const borderColor = renderBorderColor({ errors, touched, id: fieldName });
  const selectStyles = {
    control: styles => ({
      ...styles,
      borderColor,
      fontSize: 12,
      borderRadius: 'none'
    })
  };

  const handleOnInputChange = (value, { action }) => {
    if (R.equals(action, 'set-value')) {
      const newValues = R.merge(values, {
        warehouse: null,
        loadedWarehouse: false
      });

      setValues(newValues);
    }
  };

  const handleChange = value => {
    if (isNilOrEmpty(value)) {
      const newValues = R.merge(values, {
        warehouse: null,
        [fieldName]: null,
        loadedWarehouse: false
      });
      setValues(newValues);
    } else {
      setFieldValue(fieldName, value);
    }
  };

  return (
    <AsyncSelect
      isClearable
      cacheOptions
      name={fieldName}
      inputId={fieldName}
      styles={selectStyles}
      onChange={handleChange}
      onInputChange={handleOnInputChange}
      placeholder="Перші дві літери міста"
      loadOptions={setDebounce(getCityOptions, 400)}
      onBlur={() => setFieldTouched(fieldName, true)}
      defaultValue={R.pathOr({}, [fieldName], values)}
    />
  );
};

const getWarehouseOptions = (CityRef, callback) => {
  const options = {
    modelName: 'Address',
    calledMethod: 'getWarehouses',
    methodProperties: { CityRef },
    apiKey: '06cc39a880ff8afeb7ebf9e5828f8e66' // NOTE: expires on 	26.02.2024 14:13:20
  };
  const url =
    'https://api.novaposhta.ua/v2.0/json/AddressGeneral/getWarehouses';
  fetch(url, { method: 'POST', body: JSON.stringify(options) })
    .then(res => res.json())
    .then(({ data }) => {
      const warehouses = R.map(
        ({ Description }) => ({ value: Description, label: Description }),
        data
      );
      callback(warehouses);
    });
};

const WarehouseField = ({ form, field }) => {
  const { values, errors, touched, setFieldValue, setFieldTouched } = form;

  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const handleSetWarehouseOptions = options => {
    setWarehouseOptions(options);
    setFieldValue('loadedWarehouse', true);
  };

  const shippingCity = R.path(['shippingCity', 'value'], values);
  const disabled = isNilOrEmpty(shippingCity);
  const fieldName = field.name;
  const borderColor = renderBorderColor({ errors, touched, id: fieldName });
  const selectStyles = {
    control: styles => ({
      ...styles,
      borderColor,
      fontSize: 12,
      borderRadius: 'none'
    })
  };

  useEffect(() => {
    if (isNotNilAndNotEmpty(shippingCity)) {
      if (R.equals(values.loadedWarehouse, false)) {
        getWarehouseOptions(shippingCity, handleSetWarehouseOptions);
      }
    } else {
      setWarehouseOptions([]);
    }
  }, [shippingCity]);

  return (
    <Select
      isClearable
      name={fieldName}
      disabled={disabled}
      inputId={fieldName}
      styles={selectStyles}
      value={values.warehouse}
      options={warehouseOptions}
      placeholder="Номер відділення"
      onBlur={() => setFieldTouched(field.name, true)}
      onChange={value => setFieldValue(field.name, value)}
    />
  );
};

const ReactSelect = ({
  form,
  field,
  options,
  isMulti = false,
  isSearchable = true,
  reactSelectComponents
}) => {
  const { errors, touched, setFieldValue, setFieldTouched } = form;

  const { name, value } = field;

  const indexedOptions = R.indexBy(R.prop('value'), options);
  let defaultValue = R.pathOr(null, [value], indexedOptions);
  if (R.and(isMulti, isNotNilAndNotEmpty(value))) {
    defaultValue = R.map(item => R.prop(item, indexedOptions), value);
  }

  const handleChange = option => {
    let fieldValue = R.pathOr(null, ['value'], option);

    if (R.and(isMulti, isNotNilAndNotEmpty(option))) {
      fieldValue = R.map(R.prop('value'), option);
    }

    return setFieldValue(name, fieldValue);
  };
  const borderColor = renderBorderColor({ errors, touched, id: name });
  const selectStyles = {
    control: styles => ({
      ...styles,
      borderColor,
      fontSize: 12,
      borderRadius: 'none'
    })
  };

  return (
    <Select
      isClearable
      name={name}
      options={options}
      isMulti={isMulti}
      styles={selectStyles}
      onChange={handleChange}
      defaultValue={defaultValue}
      isSearchable={isSearchable}
      components={reactSelectComponents}
      onBlur={() => setFieldTouched(name, true)}
    />
  );
};

const ReactDropZone = ({ uploadUrl }) => {
  const getUploadParams = () => {
    return {
      url: uploadUrl
    };
  };

  const handleChangeStatus = ({ meta }, status) => {
    if (status === 'headers_received') {
      showToastifyMessage(`${meta.name} uploaded!`);
    } else if (status === 'aborted') {
      showToastifyMessage(`${meta.name}, upload failed...`, 'error');
    } else if (R.equals(status, 'removed')) {
      showToastifyMessage(`${meta.name}, removed...`);
    }
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      styles={{
        dropzone: { minHeight: 200, maxHeight: 250 },
        submitButtonContainerStyle: { display: 'none' }
      }}
    />
  );
};

const ArrayField = ({
  push,
  form,
  remove,
  fields,
  arrayName,
  setOptionsForArray
}) => {
  let emptyRow = '';

  if (R.gt(R.length(fields), 1)) {
    emptyRow = R.compose(
      R.map(({ defaultValue }) => R.or(defaultValue, '')),
      R.indexBy(R.prop('id'))
    )(fields);
  }

  const handleAddRow = () => push(emptyRow);
  const handleRemoveRow = index => remove(index);
  const items = R.pathOr([], ['values', arrayName], form);

  return (
    <Box mt={15} width="100%" border="1px solid" borderRadius="4px" p={15}>
      <Flex
        cursor="pointer"
        fontWeight="bold"
        alignItems="center"
        width="max-content"
        onClick={handleAddRow}
      >
        Add {arrayName} <Icon ml={10} iconName="plusInRound" />
      </Flex>
      {items.map((item, rowIndex) => (
        <Flex key={rowIndex} width="100%" alignItems="center" flexWrap="wrap">
          <Icon
            mr={10}
            width={24}
            height={24}
            iconName="trash"
            handleClick={() => handleRemoveRow(rowIndex)}
          />
          {fields.map((field, index) => {
            const { id, wrapperStyles } = field;

            const fieldName = is.undefined(id)
              ? `${arrayName}.${rowIndex}`
              : `${arrayName}.${rowIndex}.${id}`;

            return (
              <FieldGroup
                {...field}
                {...wrapperStyles}
                key={index}
                id={fieldName}
                values={form.values}
                options={setOptionsForArray(field)}
              />
            );
          })}
        </Flex>
      ))}
    </Box>
  );
};

export const FieldComponent = ({
  id,
  name,
  value,
  options,
  isMulti,
  uploadUrl,
  isSearchable,
  type = 'text',
  reactSelectComponents
}) => {
  const fieldTypes = {
    text: <Field id={id} name={id} component={TextField} />,
    number: <Field id={id} name={id} component={NumberField} />,
    toggle: <Field id={id} name={id} component={ToggleField} />,
    textarea: <Field id={id} name={id} component={TextAreaField} />,
    warehouse: <Field id={id} name={id} component={WarehouseField} />,
    searchCity: <Field id={id} name={id} component={SearchCityField} />,
    reactDropzone: <Field component={ReactDropZone} uploadUrl={uploadUrl} />,
    radio: <Field id={id} name={name} value={value} component={RadioField} />,
    reactSelect: (
      <Field
        id={id}
        name={id}
        isMulti={isMulti}
        options={options}
        component={ReactSelect}
        isSearchable={isSearchable}
        reactSelectComponents={reactSelectComponents}
      />
    )
  };

  return fieldTypes[type];
};

export const FieldGroup = ({
  mr,
  id,
  type,
  label,
  width,
  values,
  options,
  display,
  isMulti,
  uploadUrl,
  setDisplay,
  arrayFields,
  fieldGroupMT,
  isSearchable,
  setOptionsForArray,
  reactSelectComponents
}) => {
  if (R.equals(type, 'array')) {
    return (
      <FieldArray
        name={id}
        render={arrayHelpers => (
          <ArrayField
            {...arrayHelpers}
            arrayName={id}
            fields={arrayFields}
            setOptionsForArray={setOptionsForArray}
          />
        )}
      />
    );
  }

  return (
    <Box
      mr={mr}
      width={width}
      mt={R.or(fieldGroupMT, 15)}
      display={is.function(setDisplay) ? setDisplay(id, values) : display}
    >
      <Label htmlFor={id}>{label}</Label>
      <InputWrapper>
        <FieldComponent
          id={id}
          type={type}
          options={options}
          isMulti={isMulti}
          uploadUrl={uploadUrl}
          arrayFields={arrayFields}
          isSearchable={isSearchable}
          reactSelectComponents={reactSelectComponents}
        />
        <ErrorMessage name={id} component={Error} />
      </InputWrapper>
    </Box>
  );
};
