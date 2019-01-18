import React from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';

import SmilesLogo from 'resources/icons/SmilesLogo';

import EditProfileForm from 'components/user/EditProfileForm';
import MenuHeader from 'components/common/MenuHeader';
import { updateUser } from 'actions/userActions';

const EditProfile = ({ history, updateUser }) => (
  <div className="page-container page-container--full-height overlap-menu">
    <MenuHeader title="Edit Profile" goBack={history.goBack} />
    <div className="container--spaced">
      <div>
        <EditProfileForm onSubmit={updateUser} />
      </div>
      <div className="footer show-for-medium">
        <SmilesLogo className="logo--small" />
      </div>
    </div>
  </div>
);

EditProfile.propTypes = {
  history: object,
  updateUser: func.isRequired
};

const mapDispatch = dispatch => ({
  updateUser: user => dispatch(updateUser(user.toJS()))
});

export default connect(null, mapDispatch)(EditProfile);
