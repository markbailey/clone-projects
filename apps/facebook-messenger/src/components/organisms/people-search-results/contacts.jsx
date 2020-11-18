import React, {  useContext } from 'react';

import { SubHeading } from '../aside/styled.components';
import Person from '../../molecules/person';

import PeopleContext from '../../../context/people';

export default function ContactSearchResults({ title, criteria, defaultResults }) {
  const { state: peopleState } = useContext(PeopleContext);
  const { contacts } = peopleState;
  const filteredContacts = criteria
    ? contacts.filter(contact => contact.displayName.includes(criteria))
    : (defaultResults || contacts);

  return (
    <>
      <SubHeading>{title || 'Contacts'} ({filteredContacts.length})</SubHeading>
      <ItemList
          component={(item) => <Person {...item} />}
          items={filteredContacts}
        />
    </>
  );
}
