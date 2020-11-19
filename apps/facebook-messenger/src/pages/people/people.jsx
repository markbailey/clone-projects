import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/atoms/button';
import Aside, {
  AsideHeader,
  AsideContent,
  AsideNavbar,
} from '../../components/organisms/aside';
import { ContactSearchResults } from '../../components/organisms/people-search-results';

const propTypes = {
  newChat: PropTypes.bool,
  isTabletOrMobile: PropTypes.bool.isRequired,
  onCreateNewMessage: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

function PeopleView({
  newChat,
  isTabletOrMobile,
  onCreateNewMessage,
  navigateTo,
  goBack,
}) {
  const onCreateMessageClick = () => {
    onCreateNewMessage();
    navigateTo('new');
  };

  return (
    <Aside>
      <AsideHeader
        text="People"
        backButton={
          isTabletOrMobile ? null : (
            <Button
              icon="arrow_back"
              title="Return to chat list"
              iconSize={24}
              iconButton
              style={{ marginRight: 8 }}
              onClick={goBack}
            />
          )
        }
      >
        {isTabletOrMobile ? (
          <Button
            title="Add a contact"
            icon="person_add"
            iconSize={24}
            iconButton
          />
        ) : (
          <Button
            title="Create new message"
            icon="create"
            iconSize={24}
            iconButton
            onClick={onCreateMessageClick}
            disabled={newChat}
          />
        )}
      </AsideHeader>

      <AsideContent>
        <ContactSearchResults title="Active Contacts" />
      </AsideContent>

      {isTabletOrMobile ? (
        <AsideNavbar activeIndex={1} onButtonClick={slug => navigateTo(slug)} />
      ) : null}
    </Aside>
  );
}

PeopleView.propTypes = propTypes;
PeopleView.defaultPropsTypes = { newChat: false };
export default memo(PeopleView);
