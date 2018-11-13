import React, { PureComponent } from 'react';
import { func, bool } from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import {
  injectIntl,
  intlShape,
  defineMessages,
  FormattedMessage
} from 'react-intl';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import { validations, signUp } from 'utils/constraints';
import gender from 'constants/gender';

const messages = defineMessages({
  name: { id: 'signup.form.name' },
  email: { id: 'login.form.email' },
  password: { id: 'login.form.password' },
  passConfirmation: { id: 'signup.form.passconfirmation' },
  gender: { id: 'signup.form.gender' },
  selectGender: { id: 'signup.form.selectGender' },
});

class SignUpForm extends PureComponent {
  static propTypes = {
    handleSubmit: func.isRequired,
    submitting: bool.isRequired,
    intl: intlShape.isRequired,
  };

  render() {
    const { handleSubmit, submitting, intl } = this.props;

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <Field
            name="username"
            label={intl.formatMessage(messages.name)}
            component={Input}
            type="text"
          />
        </div>
        <div>
          <Field
            name="email"
            label={intl.formatMessage(messages.email)}
            component={Input}
            type="email"
          />
        </div>
        <div>
          <Field
            name="password"
            label={intl.formatMessage(messages.password)}
            component={Input}
            type="password"
          />
        </div>
        <div>
          <Field
            name="passwordConfirmation"
            label={intl.formatMessage(messages.passConfirmation)}
            component={Input}
            type="password"
          />
        </div>
        <div>
          <Field
            name="gender"
            label={intl.formatMessage(messages.gender)}
            component="select"
            className="select"
          >
            <option>{intl.formatMessage(messages.selectGender)}</option>
            {gender.map((option, key) => <option key={key} value={option.value}>{option.text}</option>)}
          </Field>
        </div>
        <button className="primary-action" type="submit">
          <FormattedMessage id="signup.form.submit" />
        </button>
        {submitting && <Loading />}
      </form>
    );
  }
}

export default reduxForm({
  form: 'signUp',
  validate: validations(signUp, { fullMessages: false })
})(injectIntl(SignUpForm));
