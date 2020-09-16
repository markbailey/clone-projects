import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.04);
  text-decoration: none;
  cursor: pointer;
`;

export const NewMessageWrapper = styled(Wrapper)`
  font-size: 13;
  color: #9197a3;
  margin: 0 8px 8px;
`;

export const ChatGroupWrapper = styled(Wrapper)``;

export const GroupText = styled.span`
  padding: 0 8px;
  flex: 1;
  pointerevents: none;
`;
