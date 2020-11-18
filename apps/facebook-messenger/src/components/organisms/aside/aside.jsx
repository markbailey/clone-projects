import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

import constants from '../../../constants';
import { ViewWrapper } from './styled.components';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

function Aside({ children }) {
  const { breakpoints } = constants;
  const isTabletOrMobile = useMediaQuery({
    query: `(max-width: ${breakpoints.tablet.max}px)`,
  });

  return (
    <ViewWrapper
      as={isTabletOrMobile ? 'main' : 'aside'}
      isTabletOrMobile={isTabletOrMobile}
    >
      {children}
    </ViewWrapper>
  );
}

Aside.propTypes = propTypes;
export default Aside;
