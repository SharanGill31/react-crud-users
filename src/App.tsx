
import React from 'react';
import MainLayout from './layouts/MainLayout';
import UsersPage from './features/users/UsersPage';

const App: React.FC = () => (
  <MainLayout>
    <UsersPage />
  </MainLayout>
);

export default App;

