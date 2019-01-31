import React, { Fragment } from 'react';
import { string } from 'prop-types';
import UserAvatar from 'resources/icons/UserAvatar';

const Avatar = (props) => {
  const { avatar } = props;

  return (
    <Fragment>
      {avatar ? <div className="preview"><img alt="Preview" src={avatar} /></div> : <UserAvatar />}
    </Fragment>
  );
};

Avatar.propTypes = {
  avatar: string
};

export default Avatar;
