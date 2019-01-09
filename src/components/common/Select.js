import React from 'react';
import { string, object, array } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { parseErrors } from 'utils/helpers';

const Select = (props) => {
  const { input, label, options, placeholder, meta: { touched, error } } = props;

  return (
    <div className="input-container">
      {label && <label className="input-label">{label}</label>}
      <div className="input-validation">
        <select className="select" {...input}>
          <option value="">{placeholder}</option>
          {options && options.map(({ id, label }, key) => <option key={key} value={id}>{label}</option>)}
        </select>
        {touched && error &&
          <span>
            <FormattedMessage
              id={parseErrors(error)}
              defaultMessage={parseErrors(error)}
            />
          </span>
        }
      </div>
    </div>
  );
};

Select.propTypes = {
  options: array,
  label: string,
  placeholder: string,
  meta: object,
  input: object.isRequired,
};

export default Select;
