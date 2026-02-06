import React from 'react';
import type { User } from '../../types/user';
import UserTable from './UserTable';

import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

interface UserListProps {
  users: User[];
  loading: boolean;
  error?: string;
  onAdd: () => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserList: React.FC<UserListProps> = (props) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '100%',
        maxWidth: '100%',     
        mx: 'auto',           
        boxShadow: 3,         
        overflowX: 'auto',    
      }}
    >
      <UserTable {...props} />
    </TableContainer>
  );
};

export default UserList;
