import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function UserList() {
  const { user, register } = useAuth();
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('cabgo-registered-users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });
  const [editUserId, setEditUserId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [deleteUserId, setDeleteUserId] = useState(null);

  const handleEdit = (userId) => {
    setEditUserId(userId);
    const userToEdit = users.find(user => user.id === userId);
    if (userToEdit) {
      setEditedName(userToEdit.name);
      setEditedEmail(userToEdit.email);
    }
  };

  const handleSave = () => {
    const updatedUsers = users.map(user => {
      if (user.id === editUserId) {
        return { ...user, name: editedName, email: editedEmail };
      }
      return user;
    });
    setUsers(updatedUsers);
    localStorage.setItem('cabgo-registered-users', JSON.stringify(updatedUsers));
    setEditUserId(null);
  };

  const handleDelete = (userId) => {
    setDeleteUserId(userId);
  };

  const confirmDelete = () => {
    const updatedUsers = users.filter(user => user.id !== deleteUserId);
    setUsers(updatedUsers);
    localStorage.setItem('cabgo-registered-users', JSON.stringify(updatedUsers));
    setDeleteUserId(null);
  };

  const cancelDelete = () => {
    setDeleteUserId(null);
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
            <Button onClick={() => handleEdit(user.id)}>Edit</Button>
            <Button onClick={() => handleDelete(user.id)}>Delete</Button>
          </li>
        ))}
      </ul>

      {/* Edit Modal */}
      <Dialog open={editUserId !== null} onOpenChange={() => setEditUserId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteUserId !== null} onOpenChange={() => setDeleteUserId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Confirmation</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this user?</p>
          <DialogFooter>
            <Button onClick={cancelDelete}>Cancel</Button>
            <Button onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserList;
