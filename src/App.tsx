import React from 'react';
import AppProvider from './hooks';

import SingIn from './pages/SingIn';
import SingUp from './pages/SingUp';
import GlobalStyles from './styles/global';

const App: React.FC = () => (
  <>
    <AppProvider>
      <SingIn />
      {/* <SingUp /> */}
    </AppProvider>
    <GlobalStyles />
  </>
);

export default App;
