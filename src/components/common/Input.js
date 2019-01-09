import React, { PureComponent } from 'react';
import { string, object } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { parseErrors } from 'utils/helpers';

export default class Input extends PureComponent {
  static propTypes = {
    input: object.isRequired,
    label: string,
    type: string.isRequired,
    placeholder: string,
    meta: object,
  };

  render() {
    const {
      input,
      label,
      type,
      placeholder,
      meta: { touched, error }
    } = this.props;

    return (
      <div className="input-container">
        {label && <label className="input-label">{label}</label>}
        <div className="input-validation">
          <input className="input" {...input} {...{ placeholder, type }} />
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
  }
}
