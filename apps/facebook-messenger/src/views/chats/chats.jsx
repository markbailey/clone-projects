// import 'styled-components/macro';

import React, { useState, useContext, useEffect, createRef } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import Aside, {
  AsideHeader,
  AsideContent,
  AsideNavbar,
} from '../../components/organisms/aside';
import Input from '../../components/atoms/input';
import Icon from '../../components/atoms/icon';
import Button from '../../components/atoms/button';
import { ContactSearchResults, PeopleSearchResults } from '../../components/organisms/people-search-results';

import ChatContext from '../../context/chat';

import ChatList from './chat-list';
import { SearchBoxWrapper } from './styled.components';

const propTypes = {
  newChat: PropTypes.bool,
  isTabletOrMobile: PropTypes.bool.isRequired,
  onCreateNewMessage: PropTypes.func.isRequired,
  onCloseNewMessage: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

function ChatsView({
  newChat,
  isTabletOrMobile,
  onCreateNewMessage,
  onCloseNewMessage,
  navigateTo,
  goBack,
}) {
  const { state: chatState } = useContext(ChatContext);
  const searchRef = createRef(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState('');

  const location = useLocation();
  const { chats, messages } = chatState;

  const onSearchBoxFocusBlur = event =>
    setSearchFocused(event.type === 'focus');

  const onCreateMessageClick = () => {
    onCreateNewMessage();
    navigateTo('new');
  };

  const onCloseMessageClick = () => {
    onCloseNewMessage();
    goBack();
  };

  useEffect(() => {
    if (!isTabletOrMobile) {
      console.log('Messages:Changed!', messages.length);
      if (messages.length > 0 && location.pathname === '/')
        navigateTo(`/t/${messages[0].recipient}`);
    }
  }, [messages, isTabletOrMobile, location, navigateTo]);

  // useEffect(() => {
  //   return () => {};
  // }, [searchRef]);

  return (
    <Aside>
      <AsideHeader text="Chats">
        {/* <Button
          title="Settings"
          icon="settings"
          iconSize={24}
          style={{ marginRight: 8 }}
        /> */}

        {!isTabletOrMobile ? (
          <Button
            title="People"
            icon="people"
            iconSize={24}
            iconButton
            onClick={() => navigateTo('people')}
          />
        ) : null}

        <Button
          title="Create new message"
          icon="create"
          iconSize={24}
          iconButton
          onClick={newChat ? null : onCreateMessageClick}
          disabled={newChat}
        />
      </AsideHeader>

      <AsideContent>
        <SearchBoxWrapper>
          <Input
            ref={searchRef}
            value={searchCriteria}
            placeholder="Search Messenger"
            title="Search messenger"
            rounded
            startAdornment={
              <Icon name="search" size={24} style={{ color: '#9197a3' }} />
            }
            onFocus={onSearchBoxFocusBlur}
            onBlur={onSearchBoxFocusBlur}
            onChange={e => setSearchCriteria(e.target.value)}
          />
        </SearchBoxWrapper>

        {searchFocused ? (
          <>
            <ContactSearchResults criteria={searchCriteria} defaultResults={[]} />
            <PeopleSearchResults criteria={searchCriteria} />
          </>
        ) : (
          <ChatList
            items={chats}
            newChat={newChat}
            onCloseMessageClick={onCloseMessageClick}
            onGroupClick={slug => navigateTo(slug)}
          />
        )}
      </AsideContent>

      {isTabletOrMobile ? (
        <AsideNavbar activeIndex={0} onButtonClick={slug => navigateTo(slug)} />
      ) : null}
    </Aside>
  );
}

ChatsView.propTypes = propTypes;
ChatsView.defaultPropsTypes = { newChat: false };
export default ChatsView;
