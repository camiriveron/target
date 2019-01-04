import React, { PureComponent } from 'react';
import { string, object, array } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { parseInputErrors } from 'utils/helpers';

export default class Select extends PureComponent {
  static propTypes = {
    options: array,
    label: string,
    placeholder: string,
    meta: object,
    input: object.isRequired,
  };

  render() {
    const {
      input,
      label,
      options,
      placeholder,
      meta: { touched, error }
    } = this.props;

    return (
      <div className="input-container">
        {label && <label className="input-label">{label}</label>}
        <div className="input-validation">
          <select className="select" {...input}>
            <option>{placeholder}</option>
            {options && options.map(({ id, label }, key) => <option key={key} value={id}>{label}</option>)}
          </select>
          {touched && error &&
            <span>
              <FormattedMessage
                id={parseInputErrors(error)}
                defaultMessage={parseInputErrors(error)}
              />
            </span>
          }
        </div>
      </div>
    );
  }
}
