import React from 'react';
import PropTypes from 'prop-types';

import ChatGroup from '../../components/chat-group';
import { List, ListItem } from '../../components/styled';

import { NoResultsWrapper } from './styled.components';

const propTypes = {
  items: PropTypes.array,
  newChat: PropTypes.bool,
  onCloseMessageClick: PropTypes.func.isRequired,
  onGroupClick: PropTypes.func.isRequired,
};

function ChatList({ items, newChat, onCloseMessageClick, onGroupClick }) {
  return (
    <>
      {newChat ? (
        <ChatGroup
          onClick={() => onGroupClick('new')}
          onClose={onCloseMessageClick}
        />
      ) : null}

      {items.length === 0 ? (
        <NoResultsWrapper>
          <span>No messages found</span>
        </NoResultsWrapper>
      ) : (
        <List>
          {items.map((chat, i) => (
            <ListItem key={`chat_${i}`}>
              <ChatGroup
                chat={chat}
                onClick={() => onGroupClick(`t/${chat.recipient}`)}
              />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}

ChatList.propTypes = propTypes;
ChatList.defaultPropsTypes = { items: [], newChat: false };
export default ChatList;
