import React from 'react';
import PropTypes from 'prop-types';

import { ContentWrapper } from './styled.components';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

function Content({ children }) {
  return <ContentWrapper>{children}</ContentWrapper>;
}

Content.propTypes = propTypes;
export default Content;
