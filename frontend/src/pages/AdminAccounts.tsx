
import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

interface AdminUser {
  id: number;
  username: string;
  email: string;
}

const AdminAccounts = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    username: '',
    email: '',
    password: '',
  });

  const fetchAdminUsers = () => {
    fetch('http://localhost:8000/api/admin_users')
      .then(response => response.json())
      .then(data => setAdminUsers(data))
      .catch(error => console.error('Error fetching admin users:', error));
  };

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/admin_users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAdmin),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          alert(data.message);
          fetchAdminUsers(); // Refresh the list
          handleClose();
          setNewAdmin({ username: '', email: '', password: '' }); // Clear form
        } else if (data.error) {
          alert(`Error: ${data.error}`);
        }
      })
      .catch(error => console.error('Error adding admin user:', error));
  };

  return (
    <div>
      <h1>Admin Accounts</h1>
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Add New Admin
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {adminUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Admin User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={newAdmin.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newAdmin.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={newAdmin.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Admin
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminAccounts;
