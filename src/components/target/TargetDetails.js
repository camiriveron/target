import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { func, object, array, bool } from 'prop-types';
import SmilesLogo from 'resources/icons/SmilesLogo';
import TargetIcon from 'resources/icons/TargetIcon';
import { deleteTarget, endSelectedTarget } from 'actions/targetActions';
import MenuHeader from 'components/common/MenuHeader';
import Modal from 'components/common/Modal';
import Loading from 'components/common/Loading';
import { getTopicIcon } from 'utils/helpers';

class TargetDetails extends Component {
  constructor() {
    super();

    this.confirmDelete = this.confirmDelete.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
  }
  state = { confirmDelete: false };

  getTopicLabel(topicId) {
    const { topics } = this.props;
    let topic = null;

    if (topics) {
      topic = topics.find(topic => topic.topic.id == topicId);
    }
    return topic ? topic.topic.label : '';
  }

  getIcon(topicId) {
    const { topics } = this.props;
    return getTopicIcon(topics, topicId);
  }

  confirmDelete() {
    this.setState({ confirmDelete: true });
  }

  deleteTarget() {
    const { deleteTarget, selectedTarget } = this.props;

    deleteTarget(selectedTarget.id);
  }

  closeDeleteModal() {
    this.setState({ confirmDelete: false });
  }

  render() {
    const { selectedTarget, endSelectedTarget, showLoading } = this.props;

    return (
      <div className="page-container page-container--full-height overlap-menu">
        <MenuHeader title="Target Details" goBack={endSelectedTarget} />
        <div className="container--spaced">
          <div className="container--spaced">
            <div>
              <div className="center show-for-medium">
                <TargetIcon />
                <h1 className="input-label mb2">
                  <FormattedMessage id="target.details.title" />
                </h1>
              </div>
              <div className="field-container">
                <div className="field">
                  <span className="field__label"><FormattedMessage id="target.details.radius" /></span>
                  <div className="field__value center">{ selectedTarget.radius } m</div>
                </div>
                <div className="field">
                  <span className="field__label"><FormattedMessage id="target.details.name" /></span>
                  <div className="field__value">{ selectedTarget.title }</div>
                </div>
                <div className="field">
                  <span className="field__label"><FormattedMessage id="target.details.topic" /></span>
                  <div className="field__value center">{ this.getTopicLabel(selectedTarget.topicId) }</div>
                </div>
              </div>
            </div>
            <button className="primary-action warning" type="button" onClick={() => { this.confirmDelete(); }} >
              <FormattedMessage id="target.delete" />
            </button>
          </div>
          <div className="footer show-for-medium">
            <SmilesLogo className="logo--small" />
          </div>
        </div>
        {this.state.confirmDelete &&
          <Modal onClose={this.closeDeleteModal}>
            <span className="modal__title">Sure you want to delete this target?</span>
            <div className="modal__icon">
              <img alt="Topic Icon" src={this.getIcon(selectedTarget.topicId)} />
            </div>
            <span className="modal__title">{ selectedTarget.title }</span>
            <button className="primary-action mb0" type="button" onClick={() => { this.deleteTarget(); }} >
              <FormattedMessage id="target.delete" />
            </button>
            {showLoading && <Loading />}
            <span className="link" onClick={() => { this.closeDeleteModal(); }}>
              <FormattedMessage id="target.cancel" />
            </span>
          </Modal>}
      </div>
    );
  }
}

TargetDetails.propTypes = {
  selectedTarget: object.isRequired,
  deleteTarget: func.isRequired,
  endSelectedTarget: func.isRequired,
  topics: array,
  showLoading: bool
};

const mapStateToProps = state => ({
  selectedTarget: state.getIn(['target', 'selectedTarget']),
  topics: state.getIn(['target', 'topics']),
  showLoading: state.getIn(['common', 'showLoading'])
});

const mapDispatch = ({
  deleteTarget,
  endSelectedTarget
});

export default connect(mapStateToProps, mapDispatch)(TargetDetails);
