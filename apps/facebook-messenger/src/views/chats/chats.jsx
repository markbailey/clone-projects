// import 'styled-components/macro';

import React, { useState, useContext, createRef, memo } from 'react';
import PropTypes from 'prop-types';

import Input from '../../components/tags/input';
import Icon from '../../components/tags/icon';
import Button from '../../components/tags/button';
import Aside, {
  AsideHeader,
  AsideContent,
  AsideNavbar,
} from '../../components/aside';
import PeopleSearchResults from '../../components/people-search-results';

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

  const { chats } = chatState;

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
            onClick={() => navigateTo('people')}
          />
        ) : null}

        <Button
          title="Create new message"
          icon="create"
          iconSize={24}
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
            startAdornment={
              <Icon name="search" size={24} style={{ color: '#9197a3' }} />
            }
            onFocus={onSearchBoxFocusBlur}
            onBlur={onSearchBoxFocusBlur}
            onChange={e => setSearchCriteria(e.target.value)}
          />
        </SearchBoxWrapper>

        {searchFocused ? (
          <PeopleSearchResults criteria={searchCriteria} />
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
        <AsideNavbar onButtonClick={slug => navigateTo(slug)} />
      ) : null}
    </Aside>
  );
}

ChatsView.propTypes = propTypes;
ChatsView.defaultPropsTypes = { newChat: false };
export default memo(ChatsView);
