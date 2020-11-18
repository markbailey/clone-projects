import 'styled-components/macro';

import React from 'react';

import Icon from '../icon';
import { noPointerEvents } from '../../../css.stylesheet';
import { ButtonElement } from './styled.components';

function Button({ children, type, icon, iconSize, ...otherProps }) {
  return (
    <ButtonElement
      type={type || 'button'}
      {...otherProps}
      aria-label={otherProps.title}
    >
      {icon ? <Icon name={icon} size={iconSize} css={noPointerEvents} /> : null}
      {children}
    </ButtonElement>
  );
}

export default Button;
