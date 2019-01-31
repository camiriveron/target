import React from 'react';
import { string } from 'prop-types';

import LogoutButton from 'components/user/LogoutButton';
import EditProfileButton from 'components/user/EditProfileButton';
import Avatar from 'components/common/Avatar';

const UserMenu = ({ username, avatar }) => (
  <div className="userMenu">
    <div className="avatar">
      <Avatar avatar={avatar} />
    </div>
    <span>{username}</span>
    <div className="userMenu__actions">
      <EditProfileButton />
      <LogoutButton />
    </div>
  </div>
);

UserMenu.propTypes = {
  username: string,
  avatar: string
};

export default UserMenu;
