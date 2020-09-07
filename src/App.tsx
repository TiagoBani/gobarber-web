import React from 'react';
import { AuthProvider } from './context/AuthContext';

import SingIn from './pages/SingIn';
import SingUp from './pages/SingUp';
import GlobalStyles from './styles/global';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SingIn />
      {/* <SingUp /> */}
    </AuthProvider>

    <GlobalStyles />
  </>
);

export default App;
