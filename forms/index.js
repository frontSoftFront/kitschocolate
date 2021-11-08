import * as R from 'ramda';
import Select from 'react-select';
import Toggle from 'react-toggle';
import { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { Field, ErrorMessage } from 'formik';
// forms
import { renderBorderColor } from './helpers';
// helpers
import { setDebounce, isNilOrEmpty, isNotNilAndNotEmpty } from '../helpers';
// ui
import { Box } from '../ui';
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
    apiKey: '5f9d3f032e76729f83f5fa983bcbc032',
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
      loadOptions={setDebounce(getCityOptions, 1000)}
      onBlur={() => setFieldTouched(fieldName, true)}
    />
  );
};

const getWarehouseOptions = (CityRef, callback) => {
  const options = {
    modelName: 'Address',
    calledMethod: 'getWarehouses',
    methodProperties: { CityRef },
    apiKey: '5f9d3f032e76729f83f5fa983bcbc032'
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
      onBlur={() => setFieldTouched(field.name, true)}
      onChange={value => setFieldValue(field.name, value)}
    />
  );
};

const SelectImages = ({ form, field }) => {
  const {
    values,
    errors,
    touched,
    imgUrls,
    setFieldValue,
    setFieldTouched
  } = form;

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

  return (
    <Select
      isClearable
      name={fieldName}
      options={imgUrls}
      disabled={disabled}
      inputId={fieldName}
      styles={selectStyles}
      value={values.warehouse}
      onBlur={() => setFieldTouched(field.name, true)}
      onChange={value => setFieldValue(field.name, value)}
    />
  );
};

export const FieldComponent = ({ id, name, value, type = 'text' }) => {
  const fieldTypes = {
    text: <Field id={id} name={id} component={TextField} />,
    number: <Field id={id} name={id} component={NumberField} />,
    toggle: <Field id={id} name={id} component={ToggleField} />,
    textarea: <Field id={id} name={id} component={TextAreaField} />,
    warehouse: <Field id={id} name={id} component={WarehouseField} />,
    searchCity: <Field id={id} name={id} component={SearchCityField} />,
    radio: <Field id={id} name={name} value={value} component={RadioField} />
  };

  return fieldTypes[type];
};

export const FieldGroup = ({ mr, id, type, label, width }) => (
  <Box mt={15} mr={mr} width={width}>
    <Label htmlFor={id}>{label}</Label>
    <InputWrapper>
      <FieldComponent id={id} type={type} />
      <ErrorMessage name={id} component={Error} />
    </InputWrapper>
  </Box>
);
