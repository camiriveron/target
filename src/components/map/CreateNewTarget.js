import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';

import SmilesLogo from 'resources/icons/SmilesLogo';
import TargetIcon from 'resources/icons/TargetIcon';

import { createTarget, endNewTarget } from 'actions/targetActions';
import TargetForm from 'components/target/TargetForm';
import MenuHeader from 'components/common/MenuHeader';

const CreateNewTarget = (props) => {
  const { endNewTarget, newTarget: { lat, lng }, createTarget } = props;

  const submitCreateTarget = target => createTarget({ ...target.toJS(), lat, lng });

  return (
    <div className="page-container page-container--full-height overlap-menu">
      <MenuHeader title="Create Target" goBack={endNewTarget} />
      <div className="container--spaced">
        <div>
          <div className="center show-for-medium">
            <TargetIcon />
            <h1 className="input-label mb2">
              <FormattedMessage id="target.create.title" />
            </h1>
          </div>
          <TargetForm onSubmit={submitCreateTarget} />
        </div>
        <div className="footer show-for-medium">
          <SmilesLogo className="logo--small" />
        </div>
      </div>
    </div>
  );
};

CreateNewTarget.propTypes = {
  endNewTarget: func.isRequired,
  newTarget: object.isRequired,
  createTarget: func.isRequired,
};

const mapStateToProps = state => ({
  newTarget: state.getIn(['target', 'newTarget'])
});

const mapDispatch = dispatch => ({
  createTarget: target => dispatch(createTarget(target)),
  endNewTarget: () => dispatch(endNewTarget())
});

export default connect(mapStateToProps, mapDispatch)(CreateNewTarget);
