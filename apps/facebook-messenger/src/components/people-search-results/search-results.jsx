import React, { useState, useContext, useEffect } from 'react';

import { List, ListItem } from '../../components/styled';
import { SubHeading } from '../../components/aside/styled.components';
import Person from '../../components/person';

import PeopleContext from '../../context/people';

function SearchResults({ criteria }) {
  const [people, setPeople] = useState([]);
  const { state: peopleState, findPeople } = useContext(PeopleContext);
  const { contacts } = peopleState;

  const searchPeople = async () => {
    if (criteria) {
      const docs = await findPeople(criteria);
      setPeople(docs || []);
    } else if (people.length > 0) setPeople([]);
  };

  useEffect(() => {
    searchPeople();
  }, [criteria]);

  return (
    <>
      <SubHeading>Contacts ({contacts.length})</SubHeading>
      {contacts.length > 0 ? (
        <List>
          {contacts.map((contact, i) => (
            <ListItem key={`contact_${i}`}>
              <Person {...contact} />
            </ListItem>
          ))}
        </List>
      ) : null}

      {criteria ? (
        <>
          <SubHeading>People ({people.length})</SubHeading>
          {people.length > 0 ? (
            <List>
              {people.map((person, i) => (
                <ListItem key={`person_${i}`}>
                  <Person {...person} />
                </ListItem>
              ))}
            </List>
          ) : null}
        </>
      ) : null}
    </>
  );
}

export default SearchResults;
