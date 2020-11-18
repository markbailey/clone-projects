import styled from 'styled-components';

import Button from '../../atoms/button';

export const ViewWrapper = styled.div `
  display: flex;
  flex-direction: column;
  flex-basis: ${props => (props.isTabletOrMobile ? 100 : 25)}%;
  max-width: ${props => (props.isTabletOrMobile ? '100%' : '420px')};
  border-right: ${props =>
    props.isTabletOrMobile ? 'none' : '1px solid #ddd'};
  height: 100%;
`;

export const HeaderWrapper = styled.div `
  display: flex;
  padding: 8px 16px;
`;

export const Heading = styled.h1 `
  line-height: 1.32;
  font-size: 24px;
  margin: 0;
  flex: 1;
`;

export const SubHeading = styled.div `
  color: rgba(0, 0, 0, 0.34);
  font-weight: bold;
  padding: 8px 16px 0;
  text-transform: uppercase;
`;

export const ContentWrapper = styled.div `
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`;

export const NavbarWrapper = styled.div `
  display: flex;
`;

export const NavbarButton = styled(Button)
`
  flex-direction: column;
  flex: 1;
  border-radius: 0;
  padding: 8px;
`;
