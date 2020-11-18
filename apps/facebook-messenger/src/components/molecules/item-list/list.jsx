import React from 'react';
import PropTypes from 'prop-types';

import { List, ListItem } from '../../../components/styled';
import randomString from '../../../utils/randomString';

const propTypes = {
  component: PropTypes.node.isRequired,
  items: PropTypes.array,
};

function ItemList({ component: Component, items }) {
  return (
    items.length > 0 ? (
      <List>
        {items.map(item => (
          <ListItem key={randomString()}>
            <Component item={item} />
          </ListItem>
        ))}
      </List>
    ) : null
  );
}

ItemList.propTypes = propTypes;
ItemList.defaultPropsTypes = { items: [] };
export default ItemList;
