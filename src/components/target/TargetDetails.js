import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { func, object, bool } from 'prop-types';
import TargetIcon from 'resources/icons/TargetIcon';
import { deleteTarget, endSelectedTarget } from 'actions/targetActions';
import Modal from 'components/common/Modal';
import Loading from 'components/common/Loading';
import HeaderPage from 'components/common/HeaderPage';

class TargetDetails extends Component {
  constructor() {
    super();

    this.confirmDelete = this.confirmDelete.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.deleteTarget = this.deleteTarget.bind(this);
  }

  state = { confirmDelete: false };

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
      <Fragment>
        <HeaderPage showForMedium title="Target Details" goBack={endSelectedTarget}>
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
                  <div className="field__value center">{ selectedTarget.topic.label }</div>
                </div>
              </div>
            </div>
            <button className="primary-action warning" type="button" onClick={this.confirmDelete} >
              <FormattedMessage id="target.delete" />
            </button>
          </div>
        </HeaderPage>
        {this.state.confirmDelete &&
          <Modal onClose={this.closeDeleteModal}>
            <span className="modal__title">Sure you want to delete this target?</span>
            <div className="modal__icon">
              <img alt="Topic Icon" src={selectedTarget.topic.icon} />
            </div>
            <span className="modal__title">{ selectedTarget.title }</span>
            <button className="primary-action mb0" type="button" onClick={this.deleteTarget} >
              <FormattedMessage id="target.delete" />
            </button>
            {showLoading && <Loading />}
            <span className="link" onClick={this.closeDeleteModal} >
              <FormattedMessage id="target.cancel" />
            </span>
          </Modal>}
      </Fragment>
    );
  }
}

TargetDetails.propTypes = {
  selectedTarget: object.isRequired,
  deleteTarget: func.isRequired,
  endSelectedTarget: func.isRequired,
  showLoading: bool
};

const mapStateToProps = state => ({
  selectedTarget: state.getIn(['target', 'selectedTarget']),
  showLoading: state.getIn(['common', 'showLoading'])
});

const mapDispatch = ({
  deleteTarget,
  endSelectedTarget
});

export default connect(mapStateToProps, mapDispatch)(TargetDetails);
