import React from 'react';

import Logo from '../../components/logo';
// import { PageRoot } from './styled.components';

export default function Home(): React.ReactElement {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ zIndex: -1, position: 'absolute', left: '50%', transform: 'translateX(-50%)', minWidth: '100%', top: 0, bottom: 0, opacity: 0.5 }}>{/**transform:'translateX(-50%)', */}
        <img src="/static/img/GB-en-20201012-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="background" style={{ maxWidth: 'auto', height: '100%' }} />
      </div>

      <header style={{ display: 'flex', alignItems: 'center', height: 64, marginTop: 20, padding: '0 3.5rem' }}>
        <Logo width={134} style={{ fill:'#ff0000' }} />
      </header>

      <div style={{ zIndex: 1, padding: '70px 45px' }}>
        <div style={{ padding: '75px 0', margin: '0 auto', color: '#fff', textAlign: 'center', width: '100%', maxWidth: '950px' }}>
          <h1 style={{ margin: '0 auto', maxWidth: '640px', fontSize: '3.125rem', lineHeight: 1.1 }}>Unlimited films, TV programmes and more.</h1>
          <h2 style={{ fontSize: '1.625rem', fontWeight: 400 }}>Watch anywhere. Cancel at any time.</h2>
        </div>
      </div>
    </div>
  );
}
