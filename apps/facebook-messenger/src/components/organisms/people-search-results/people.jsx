import React, { useState, useContext, useEffect } from 'react';

import { SubHeading } from '../aside/styled.components';
import Person from '../../molecules/person';
import ItemList from '../../molecules/item-list';

import PeopleContext from '../../../context/people';

function SearchResults({ criteria }) {
  const [people, setPeople] = useState([]);
  const { findPeople } = useContext(PeopleContext);

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
    criteria ? (
      <>
        <SubHeading>People ({people.length})</SubHeading>
        <ItemList
          component={(item) => <Person {...item} />}
          items={people}
        />
      </>
    ) : null
  );
}

export default SearchResults;
