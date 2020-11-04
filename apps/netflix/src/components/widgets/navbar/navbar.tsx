import React from 'react';

import Logo from '../../logo';
import { NavbarRoot } from './styled.components';

export default function Navbar(): React.ReactElement {
  return (
    <NavbarRoot>
      <Logo />
    </NavbarRoot>
  )
}
