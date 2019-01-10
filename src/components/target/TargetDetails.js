import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';

import SmilesLogo from 'resources/icons/SmilesLogo';
import TargetIcon from 'resources/icons/TargetIcon';

import { deleteTarget, endSelectedTarget } from 'actions/targetActions';
import MenuHeader from 'components/common/MenuHeader';

const TargetDetails = (props) => {
  const { selectedTarget, deleteTarget, endSelectedTarget } = props;

  const submitDeleteTarget = deleteTarget(selectedTarget.toJS());

  return (
    <div className="page-container page-container--full-height overlap-menu">
      <MenuHeader title="Target Details" goBack={endSelectedTarget} />
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
              <span className="field__label"><FormattedMessage id="target.form.title" /></span>
              <div className="field__value">{ selectedTarget.title }</div>
            </div>
          </div>
          <button className="primary-action" type="button" onClick={() => { submitDeleteTarget(); }} >
            <FormattedMessage id="target.delete" />
          </button>
        </div>
        <div className="footer show-for-medium">
          <SmilesLogo className="logo--small" />
        </div>
      </div>
    </div>
  );
};

TargetDetails.propTypes = {
  selectedTarget: object.isRequired,
  deleteTarget: func.isRequired,
  endSelectedTarget: func.isRequired
};

const mapStateToProps = state => ({
  selectedTarget: state.getIn(['target', 'selectedTarget'])
});

const mapDispatch = dispatch => ({
  deleteTarget: target => dispatch(deleteTarget(target)),
  endSelectedTarget: () => dispatch(endSelectedTarget()),
});

export default connect(mapStateToProps, mapDispatch)(TargetDetails);
