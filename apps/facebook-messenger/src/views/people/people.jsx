import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/tags/button';
import Aside, {
  AsideHeader,
  AsideContent,
  AsideNavbar,
} from '../../components/aside';
import Person from '../../components/person';

import { SubHeading } from '../../components/aside/styled.components';
import { List, ListItem } from '../../components/styled';

import PeopleContext from '../../context/people';

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
  const { state: peopleState } = useContext(PeopleContext);
  const { contacts } = peopleState;

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
        <SubHeading>Active Contacts ({contacts.length})</SubHeading>
        {contacts.length > 0 ? (
          <List>
            {contacts.map((contact, i) => (
              <ListItem key={`contact_${i}`} noPadding>
                <Person {...contact} />
              </ListItem>
            ))}
          </List>
        ) : null}
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
