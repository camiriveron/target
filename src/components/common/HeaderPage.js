import React from 'react';
import { oneOfType, arrayOf, node, func, bool, string } from 'prop-types';

import SmilesLogo from 'resources/icons/SmilesLogo';
import MenuHeader from 'components/common/MenuHeader';

const HeaderPage = (props) => {
  const { children, goBack, showForMedium, title } = props;

  return (
    <div className="page-container page-container--full-height overlap-menu">
      <MenuHeader showForMedium={showForMedium} title={title} goBack={goBack} />
      <div className="container--spaced">
        {children}
        <div className="footer show-for-medium">
          <SmilesLogo className="logo--small" />
        </div>
      </div>
    </div>
  );
};

HeaderPage.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node
  ]).isRequired,
  goBack: func.isRequired,
  showForMedium: bool,
  title: string
};

export default HeaderPage;
