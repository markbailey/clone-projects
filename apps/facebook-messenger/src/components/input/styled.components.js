import styled from 'styled-components';

export const InputRoot = styled.div `
  position: relative;
  flex: 1;
`;

export const Adornment = styled.div `
  position: absolute;
  top: 0;
  left: ${(props) => (props.position === 'start' ? '8px' : 'auto')};
  right: ${(props) => (props.position === 'end' ? '8px' : 'auto')};

  display: flex;
  align-items: center;

  height: 100%;
`;

export const FormControl = styled.input `
  color: #222 !important;
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: ${(props) => (props.rounded? 50 : 5)}px;
  font-size: 15px;
  height: 36px;
  padding-left: ${(props) => (props.startAdornment ? 36 : 16)}px;
  padding-right: ${(props) => (props.endAdornment ? 36 : 16)}px;
  text-align: left;

  box-sizing: border-box;
  line-height: normal;
  // outline: 0;
  width: 100%;

  ${(props) => (props.noBorder? 'border-style: none;' : 'border: 1px solid #ddd;')}

  :focus: {
    outline-offset: 0px;
  }
`;
