import styled from 'styled-components';

export const List = styled.ul`
  padding: 0;
  liststyle: none;
`;

export const ListItem = styled.li`
  ${props => (props.noPadding ? '' : 'padding: 0 8px;')}
`;
