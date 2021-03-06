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
import Select from 'components/common/Select';
import { validations, createTarget } from 'utils/constraints';
import { getTopics } from 'actions/targetActions';

const messages = defineMessages({
  radius: { id: 'target.form.radius' },
  title: { id: 'target.form.title' },
  topic: { id: 'target.form.topic' },
  selectTopic: { id: 'target.form.selectTopic' },
  titlePlaceholder: { id: 'target.form.titlePlaceholder' }
});

export class TargetForm extends PureComponent {
  static propTypes = {
    handleSubmit: func.isRequired,
    intl: intlShape.isRequired,
    submitting: bool.isRequired,
    error: array,
    topics: array,
    getTopics: func.isRequired
  }

  componentDidMount() {
    const { getTopics, topics } = this.props;

    if (!topics) {
      getTopics();
    }
  }

  render() {
    const { handleSubmit, error, submitting, intl, topics } = this.props;
    const toInt = value => (value === undefined ? undefined : parseInt(value, 10));

    return (
      <form className="form" onSubmit={handleSubmit}>
        {error && <span className="error">{error}</span>}
        <Field
          name="radius"
          label={intl.formatMessage(messages.radius)}
          component={Input}
          type="number"
          normalize={toInt}
        />
        <Field
          name="title"
          label={intl.formatMessage(messages.title)}
          component={Input}
          type="text"
          placeholder={intl.formatMessage(messages.titlePlaceholder)}
        />
        <Field
          name="topicId"
          label={intl.formatMessage(messages.topic)}
          placeholder={intl.formatMessage(messages.selectTopic)}
          component={Select}
          normalize={toInt}
          options={topics}
        />
        <button className="primary-action" type="submit">
          <FormattedMessage id="target.form.submit" />
        </button>
        {submitting && <Loading />}
      </form>
    );
  }
}

const mapState = state => ({
  initialValues: { radius: state.getIn(['target', 'targetRadius']), title: '' },
  topics: state.getIn(['target', 'topics'])
});

const mapDispatch = dispatch => ({
  getTopics: () => dispatch(getTopics())
});

TargetForm = reduxForm({
  form: 'create-target',
  validate: validations(createTarget, { fullMessages: false }),
  enableReinitialize: false
})(TargetForm);

export default connect(mapState, mapDispatch)(injectIntl(TargetForm));
