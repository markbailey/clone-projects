import React from 'react';
import PropTypes from 'prop-types';

import ChatGroup from '../../components/molecules/chat-group';
import ItemList from '../../components/molecules/item-list';

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
        <ItemList
          component={(item) => <ChatGroup
            chat={item}
            onClick={() => onGroupClick(`t/${item.recipient}`)}
          />}
          items={items}
        />
      )}
    </>
  );
}

ChatList.propTypes = propTypes;
ChatList.defaultPropsTypes = { items: [], newChat: false };
export default ChatList;
