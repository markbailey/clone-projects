import React from 'react';

import Icon from '../../atoms/icon';

import { NavbarWrapper, NavbarButton } from './styled.components';

function Navbar({ onButtonClick, activeIndex }) {
  return (
    <NavbarWrapper>
      <NavbarButton
        icon={<Icon name="chat_bubble" size={24} />}
        onClick={activeIndex !== 0 ? () => onButtonClick('/') : null}
        style={{ color: activeIndex === 0 ? '#222' : '#aaa' }}
      >
        <small>Chats</small>
      </NavbarButton>

      <NavbarButton
        icon={<Icon name="people" size={24} />}
        onClick={activeIndex !== 1 ? () => onButtonClick('people') : null}
        style={{ color: activeIndex === 1 ? '#222' : '#aaa' }}
      >
        <small>People</small>
      </NavbarButton>
    </NavbarWrapper>
  );
}

export default Navbar;
