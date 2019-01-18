import React, { PureComponent } from 'react';
import { func, array, bool } from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import {
  injectIntl,
  intlShape,
  defineMessages,
  FormattedMessage
} from 'react-intl';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import AvatarFile from 'components/common/AvatarFile';
import Select from 'components/common/Select';
import { validations, editProfile } from 'utils/constraints';
import gender from 'constants/gender';

const messages = defineMessages({
  username: { id: 'user.form.username' },
  email: { id: 'user.form.email' },
  firstName: { id: 'user.form.firstName' },
  lastName: { id: 'user.form.lastName' },
  gender: { id: 'user.form.gender' }
});

export class EditProfileForm extends PureComponent {
  static propTypes = {
    handleSubmit: func.isRequired,
    intl: intlShape.isRequired,
    submitting: bool.isRequired,
    error: array,
    submitSucceeded: bool.isRequired
  }

  render() {
    const { handleSubmit, error, submitting, intl, submitSucceeded } = this.props;

    return (
      <form className="form" onSubmit={handleSubmit}>
        {submitSucceeded && <span className="success"><FormattedMessage id="user.form.success" /></span>}
        {error && <span className="error">{error}</span>}
        <Field
          name="avatar"
          component={AvatarFile}
          type="file"
        />
        <Field
          name="username"
          label={intl.formatMessage(messages.username)}
          component={Input}
          type="text"
        />
        <Field
          name="email"
          label={intl.formatMessage(messages.email)}
          component={Input}
          type="email"
        />
        <Field
          name="firstName"
          label={intl.formatMessage(messages.firstName)}
          component={Input}
          type="text"
        />
        <Field
          name="lastName"
          label={intl.formatMessage(messages.lastName)}
          component={Input}
          type="text"
        />
        <Field
          name="gender"
          label={intl.formatMessage(messages.gender)}
          component={Select}
          className="select"
          {...{
            options: gender,
            placeholder: intl.formatMessage(messages.gender)
          }}
        />
        <button className="primary-action" type="submit">
          <FormattedMessage id="user.form.submit" />
        </button>
        {submitting && <Loading />}
      </form>
    );
  }
}

const mapState = state => ({
  initialValues: {
    username: state.getIn(['session', 'user', 'username']),
    email: state.getIn(['session', 'user', 'email']),
    firstName: state.getIn(['session', 'user', 'firstName']),
    lastName: state.getIn(['session', 'user', 'lastName']),
    gender: state.getIn(['session', 'user', 'gender']),
    avatar: state.getIn(['session', 'user', 'avatar', 'normalUrl']),
  }
});

EditProfileForm = reduxForm({
  form: 'editProfile',
  validate: validations(editProfile, { fullMessages: false }),
  enableReinitialize: true
})(EditProfileForm);

export default connect(mapState)(injectIntl(EditProfileForm));
