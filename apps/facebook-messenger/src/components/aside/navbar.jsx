import React from 'react';

import Icon from '../icon';

import { NavbarWrapper, NavbarButton } from './styled.components';

function Navbar({ onButtonClick }) {
  return (
    <NavbarWrapper>
      <NavbarButton
        icon={<Icon name="chat_bubble" />}
        onClick={() => onButtonClick('/')}
      >
        <span>Chats</span>
      </NavbarButton>

      <NavbarButton
        icon={<Icon name="people" />}
        onClick={() => onButtonClick('people')}
      >
        <span>People</span>
      </NavbarButton>
    </NavbarWrapper>
  );
}

export default Navbar;
