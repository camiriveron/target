import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import routes from 'constants/routesPaths';

const EditProfileButton = () => (
  <Link className="link link--primary" to={routes.editProfile}>
    <FormattedMessage id="edit.button" />
  </Link>
);

export default EditProfileButton;
