import 'styled-components/macro';

import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Input from '../../components/input';
import Icon from '../../components/icon';
import Button from '../../components/button';
import Message from '../../components/chat-message';

import ChatContext from '../../context/chat';
import constants from '../../constants';
import { marginRight, transparentInput } from '../../css.stylesheet';

import ComposeMessage from './compose';
import { ViewWrapper, HeaderBar, MessagesContainer } from './styled.components';

const propTypes = {
  isNew: PropTypes.bool,
  goBack: PropTypes.func.isRequired,
};

function ChatView({ isNew, goBack }) {
  const { state: chatState } = useContext(ChatContext);

  const { messages, chats } = chatState;
  const { breakpoints } = constants;

  const params = useParams();
  const isTabletOrMobile = useMediaQuery({
    query: `(max-width: ${breakpoints.tablet.max}px)`,
  }); // 1224

  const filteredMessages = !isNew
    ? messages.filter(
        message =>
          message.to === params.recipient || message.from === params.recipient,
      )
    : [];

  useEffect(() => {
    // if (!isNew && !contacts.find(contact => contact.id === params.userId))
    //   history.push('/');
    // eslint-disable-next-line
  }, []);

  return (
    <ViewWrapper>
      <HeaderBar>
        {isTabletOrMobile ? (
          <Button
            icon="arrow_back"
            title="Return to chat list"
            css={marginRight}
            onClick={goBack}
          />
        ) : null}

        {isNew ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <span>To:</span>
            <Input
              placeholder="Type the name of a person or group"
              title="Type the name of a person or group"
              css={transparentInput}
            />
          </div>
        ) : null}

        {!isNew && params.recipient ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Icon name="account_circle" size={40} />
            <div style={{ paddingLeft: 8 }}>
              <strong>{params.recipient}</strong>
              <br />
              <small>Active now</small>
            </div>
          </div>
        ) : null}
      </HeaderBar>

      <MessagesContainer>
        {filteredMessages.map((message, index) => (
          <Message key={`message_${index}`} {...message} />
        ))}
      </MessagesContainer>

      <ComposeMessage
        disabled={isNew}
        onSendMessage={message => console.log(message)}
      />
    </ViewWrapper>
  );
}

ChatView.propTypes = propTypes;
ChatView.defaultPropsTypes = { isNew: false };
export default ChatView;
