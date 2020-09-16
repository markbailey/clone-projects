import React, { useContext } from 'react';

import { List, ListItem } from '../../components/styled';
import { SubHeading } from '../../components/aside/styled.components';

import PeopleContext from '../../context/people';

function SearchResults({ criteria }) {
  const { state: peopleState } = useContext(PeopleContext);
  const { contacts } = peopleState;

  return (
    <>
      <SubHeading>Contacts</SubHeading>

      <List>
        {contacts.map((contact, i) => (
          <ListItem key={`contact_${i}`}>
            <div></div>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default SearchResults;
