import React from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { clearErrors } from 'actions/commonActions';
import {
  injectIntl,
  defineMessages,
  intlShape
} from 'react-intl';

const ErrorBox = (props) => {
  const { errors, intl, clearErrors } = props;

  return (
    <div className="error-box-container">
      {errors.map((error, key) => {
        const message = defineMessages({ error: { id: error } });

        return (
          <div key={key} className="error-box">
            <span className="error-message">{intl.formatMessage(message.error) ? intl.formatMessage(message.error) : error}</span>
            <span className="close" onClick={() => clearErrors(error)}>x</span>
          </div>
        );
      })
      }
    </div>
  );
};

ErrorBox.propTypes = {
  clearErrors: func.isRequired,
  intl: intlShape.isRequired,
  errors: object.isRequired
};

const mapDispatch = dispatch => ({
  clearErrors: error => dispatch(clearErrors(error))
});

export default connect(null, mapDispatch)(injectIntl(ErrorBox));
