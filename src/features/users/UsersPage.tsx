

import React, { useEffect, useState } from 'react';
import UserList from '../../components/users/UserList';
import UserForm from '../../components/users/UserForm';
import { getUsers, createUser, updateUser, deleteUser } from '../../api/userApi';
import type { User } from '../../types/user';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

type ModalMode = 'create' | 'edit';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('create');
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | undefined>();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const fetchUsers = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = () => {
    setModalMode('create');
    setSelectedUser(undefined);
    setModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setModalMode('edit');
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleDeleteRequest = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    setLoading(true);
    setError(undefined);
    try {
      await deleteUser(userToDelete.id);
      setSnackbar({ open: true, message: 'User deleted successfully', severity: 'success' });
      await fetchUsers();
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message || 'Failed to delete user', severity: 'error' });
      setError(err.message || 'Failed to delete user');
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setUserToDelete(undefined);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(undefined);
  };

  const handleFormSubmit = async (formData: User) => {
    setLoading(true);
    setError(undefined);
    try {
      if (modalMode === 'create') {
        await createUser(formData);
        setSnackbar({ open: true, message: 'User created successfully', severity: 'success' });
      } else if (modalMode === 'edit' && selectedUser) {
        await updateUser(selectedUser.id, formData);
        setSnackbar({ open: true, message: 'User updated successfully', severity: 'success' });
      }
      setModalOpen(false);
      await fetchUsers();
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message || 'Failed to save user', severity: 'error' });
      setError(err.message || 'Failed to save user');
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <UserList
        users={users}
        loading={loading}
        error={error}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDeleteRequest}
      />

      
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" disabled={loading}>
            {loading ? <CircularProgress size={20} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      
      <Dialog open={modalOpen} onClose={handleModalClose} maxWidth="sm" fullWidth>
        <DialogTitle>{modalMode === 'create' ? 'Add User' : 'Edit User'}</DialogTitle>
        <DialogContent>
          <UserForm
            initialValues={modalMode === 'edit' ? selectedUser : undefined}
            onSubmit={handleFormSubmit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} disabled={loading}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UsersPage;