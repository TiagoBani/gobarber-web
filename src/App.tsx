import React from 'react';

import SingIn from './pages/SingIn';
import SingUp from './pages/SingUp';
import GlobalStyles from './styles/global';

const App: React.FC = () => (
  <>
    <SingIn />
    {/* <SingUp /> */}
    <GlobalStyles />
  </>
);

export default App;
