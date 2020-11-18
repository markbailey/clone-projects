import React from 'react';
import PropTypes from 'prop-types';

import { HeaderWrapper, Heading } from './styled.components';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  text: PropTypes.string.isRequired,
  backButton: PropTypes.node,
};

function Header({ children, text, backButton }) {
  return (
    <HeaderWrapper>
      {backButton}
      <Heading>{text}</Heading>
      {children}
    </HeaderWrapper>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = { backButton: undefined };
export default Header;
