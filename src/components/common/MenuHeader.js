import React from 'react';
import { string, func, bool } from 'prop-types';

const MenuHeader = (props) => {
  const { title, goBack, showForMedium } = props;

  return (
    <div className={`menu-header ${showForMedium ? 'show-for-medium' : ''}`}>
      <a className="back-arrow" onClick={goBack}>
        <span>&lt;</span>
      </a>
      <span className="menu-header__title">{ title }</span>
    </div>
  );
};

MenuHeader.propTypes = {
  title: string.isRequired,
  goBack: func.isRequired,
  showForMedium: bool,
};

export default MenuHeader;
