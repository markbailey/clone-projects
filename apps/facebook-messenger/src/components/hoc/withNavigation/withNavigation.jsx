import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function withNavigation(WrappedComponent) {
  return props => {
    const [returnHistory, setReturnHistory] = useState([]);

    const location = useLocation();
    const history = useHistory();

    const navigateTo = slug => {
      const newReturnHistory = [...returnHistory];

      const current = location.pathname;
      const segments = current.split('/').filter(i => i);
      const chatIndex = segments.indexOf('t');
      const recipientName =
        chatIndex > -1 && segments.length > chatIndex + 1
          ? segments[chatIndex + 1]
          : null;

      let path;

      switch (slug) {
        case 'new':
          if (current.includes('people')) newReturnHistory.push(`/new`);
          if (recipientName) newReturnHistory.push(`/t/${recipientName}`);
          setReturnHistory(newReturnHistory);

          path =
            current.length > 1
              ? `${current.replace(/\/((new)|(t\/.*))$/g, '')}/${slug}`
              : slug;
          break;
        case 'people':
          if (current.includes('new') && !returnHistory.includes('/new')) {
            newReturnHistory.splice(0, 0, `/new`);
            setReturnHistory(newReturnHistory);
          }

          path = `/${slug}${current.length > 1 ? current : ''}`;
          break;
        default:
          if (/t\/.*/.test(slug)) {
            path =
              current.length > 1
                ? current.replace(/((new)|(t\/.*))$/g, slug)
                : slug;
          } else {
            path = '/';
          }
          break;
      }

      history.push(path);
    };

    const goBack = () => {
      const newReturnHistory = [...returnHistory];
      let path;

      if (returnHistory.length > 0) {
        path = newReturnHistory[0];
        newReturnHistory.splice(0, 1);
        setReturnHistory(newReturnHistory);
      } else if (/^(\/t\/.*)$/g.test(location.pathname)) path = '/';
      else {
        const toRemove = location.pathname
          .split('/')
          .filter(i => i)
          .splice(0, 1)[0];

        const regex = new RegExp(`\\/${toRemove}`);
        path = location.pathname.replace(regex, '') || '/';
      }

      history.push(path);
    };

    return (
      <WrappedComponent
        {...props}
        location={location}
        navigateTo={navigateTo}
        goBack={goBack}
      />
    );
  };
}

export default withNavigation;
