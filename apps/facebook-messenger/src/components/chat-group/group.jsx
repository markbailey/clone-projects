import 'styled-components/macro';

import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../tags/icon';
import Button from '../tags/button';

import { noPointerEvents } from '../../css.stylesheet';

import {
  NewMessageWrapper,
  ChatGroupWrapper,
  GroupText,
} from './styled.components';

const propTypes = {
  chat: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

function ChatGroup({ chat, onClick, onClose }) {
  const Wrapper = chat ? ChatGroupWrapper : NewMessageWrapper;

  const onGroupClick = event =>
    chat || event.target.type !== 'button' ? onClick() : false;

  return (
    <Wrapper onClick={onGroupClick}>
      <Icon name="account_circle" size={48} css={noPointerEvents} />
      <GroupText>
        {chat ? (
          <>
            <strong>{chat.recipient}</strong>
            <br />
            <small>{chat.lastMessage}</small>
          </>
        ) : (
          'New message'
        )}
      </GroupText>

      {!chat ? (
        <Button
          title="Close"
          icon="close"
          iconSize={18}
          onClick={onClose ?? null}
        />
      ) : null}
    </Wrapper>
  );
}

ChatGroup.propTypes = propTypes;
ChatGroup.defaultPropsTypes = { chat: undefined, onClose: undefined };
export default ChatGroup;
