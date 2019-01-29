import React from 'react';
import { string, func } from 'prop-types';

const MenuHeader = (props) => {
  const { title, goBack } = props;

  return (
    <div className="menu-header">
      <a className="back-arrow" onClick={goBack}>
        <span>&lt;</span>
      </a>
      <span className="menu-header__title">{ title }</span>
    </div>
  );
};

MenuHeader.propTypes = {
  title: string.isRequired,
  goBack: func.isRequired
};

export default MenuHeader;
