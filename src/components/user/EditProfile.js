import React from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';

import EditProfileForm from 'components/user/EditProfileForm';
import { updateUser } from 'actions/userActions';
import HeaderPage from 'components/common/HeaderPage';

const EditProfile = ({ history, updateUser }) => (
  <HeaderPage showForMedium={false} title="Edit Profile" goBack={history.goBack}>
    <div>
      <EditProfileForm onSubmit={updateUser} />
    </div>
  </HeaderPage>
);

EditProfile.propTypes = {
  history: object,
  updateUser: func.isRequired
};

const mapDispatch = dispatch => ({
  updateUser: user => dispatch(updateUser(user.toJS()))
});

export default connect(null, mapDispatch)(EditProfile);
