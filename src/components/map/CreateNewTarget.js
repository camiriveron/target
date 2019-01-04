import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { func, number } from 'prop-types';

import SmilesLogo from 'resources/icons/SmilesLogo';
import Target from 'resources/icons/Target';

import { createTarget, endNewTarget } from 'actions/targetActions';
import TargetForm from 'components/target/TargetForm';
import MenuHeader from 'components/common/MenuHeader';

const CreateNewTarget = (props) => {
  const { endNewTarget, newTargetLat, newTargetLong, createTarget } = props;

  const submitCreateTarget = (target) => {
    createTarget({ ...target.toJS(), lat: newTargetLat, lng: newTargetLong });
  };

  return (
    <div className="page-container page-container--full-height overlap-menu">
      <MenuHeader title="Create Target" goBack={endNewTarget} />
      <div className="container--spaced">
        <div>
          <div className="center show-for-medium">
            <Target />
            <h1 className="input-label mb3">
              <FormattedMessage id="target.create.title" />
            </h1>
          </div>
          <TargetForm onSubmit={submitCreateTarget} />
        </div>
        <div className="footer show-for-medium">
          <SmilesLogo className="logo--small" />
          <div />
        </div>
      </div>
    </div>
  );
};

CreateNewTarget.propTypes = {
  endNewTarget: func.isRequired,
  newTargetLat: number.isRequired,
  newTargetLong: number.isRequired,
  createTarget: func.isRequired,
};

const mapStateToProps = state => ({
  newTargetLat: state.getIn(['target', 'newTargetLat']),
  newTargetLong: state.getIn(['target', 'newTargetLong'])  
});

const mapDispatch = dispatch => ({
  createTarget: target => dispatch(createTarget(target)),
  endNewTarget: () => dispatch(endNewTarget())
});

export default connect(mapStateToProps, mapDispatch)(CreateNewTarget);
