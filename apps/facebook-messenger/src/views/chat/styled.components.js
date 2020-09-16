import styled from 'styled-components';

export const ViewWrapper = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 16px;
  border-bottom: 1px solid rgb(221, 221, 221);
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const ComposeMessageForm = styled.form`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 8px;
`;
