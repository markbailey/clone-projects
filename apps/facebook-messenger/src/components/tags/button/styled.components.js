import styled from 'styled-components';

export const ButtonElement = styled.button `
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  // outline: 0;
  font-size: 14px;
  text-transform: uppercase;
  line-height: 1.3;

  ${props => props.primary ? `
  background-color: #1e88e5;
  color: #fff;
  border-color: #1e88e5;
  ` : 'background-color: rgba(0, 0, 0, 0.04);'}
  ${props => props.transparent ? `background-color: transparent;` : ''}

  border-radius: 5px;
  padding: 8px 16px;

  ${props =>
    props.iconButton ? 'padding: 5px; border-radius: 30px; border: 0;' : ''}
  ${props => (props.block ? 'width: 100%;' : '')}

  &:hover {
    background-color: ${props => props.primary ? '#1c79cc' : '#ddd'};
  }
`;
