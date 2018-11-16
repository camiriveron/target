import React from 'react';
import { string } from 'prop-types';

import LogoutButton from 'components/user/LogoutButton';
import UserAvatar from 'resources/icons/UserAvatar';

const UserMenu = ({ username }) => (
  <div className="userMenu">
    <div className="userAvatar">
      <UserAvatar />
    </div>
    <span>{username}</span>
    <div>
      <LogoutButton />
    </div>
  </div>
);

UserMenu.propTypes = {
  username: string,
};

export default UserMenu;
