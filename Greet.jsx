import React, { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Container,
  Row,
  Table,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

// Initial State
const initialUserState = {
  id: '',
  firstName: '',
  lastName: '',
  gender: '',
  hobbies: [],
  email: '',
  password: '',
  cPassword: '',
};

const App = () => {
  const [profiles, setProfiles] = useState(() => JSON.parse(localStorage.getItem('profiles')) || []);
  const [user, setUser] = useState(initialUserState);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  // Sync profiles with localStorage
  useEffect(() => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }, [profiles]);

  const resetProfile = () => setUser(initialUserState);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setUser((prev) => ({
        ...prev,
        hobbies: checked ? [...prev.hobbies, value] : prev.hobbies.filter((h) => h !== value),
      }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId !== null) {
      setProfiles(profiles.map((profile) => (profile.id === editId ? { ...user, id: editId } : profile)));
    } else {
      setProfiles([...profiles, { ...user, id: Date.now().toString() }]);
    }
    resetProfile();
    setEditId(null);
    setShowForm(false);
  };

  // Edit Employee
  const handleEdit = (id) => {
    const selectedProfile = profiles.find((profile) => profile.id === id);
    setUser(selectedProfile);
    setEditId(id);
    setShowForm(true);
  };

  // Delete Employee
  const handleDelete = (id) => setProfiles(profiles.filter((profile) => profile.id !== id));

  return (
    <Container>
      <Header onAdd={() => setShowForm(true)} />
      {showForm ? (
        <EmployeeForm user={user} handleChange={handleChange} handleSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
      ) : (
        <EmployeeTable profiles={profiles} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </Container>
  );
};

const Header = ({ onAdd }) => (
  <Row className="m-2 py-2">
    <Col className="d-flex justify-content-between align-items-center">
      <h2>Employee Management</h2>
      <Button className='add-btn' color="primary" onClick={onAdd}>Add Employee</Button>
    </Col>
  </Row>
);

const EmployeeForm = ({ user, handleChange, handleSubmit, onCancel }) => (
  <Row>
    <Col md={8} className="mx-auto">
      <h4 className="my-3">{user.id ? 'Edit Employee' : 'Add Employee'}</h4>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col><InputField name="firstName" value={user.firstName} placeholder="First Name" handleChange={handleChange} /></Col>
          <Col><InputField name="lastName" value={user.lastName} placeholder="Last Name" handleChange={handleChange} /></Col>
        </Row>
        <GenderSelection gender={user.gender} handleChange={handleChange} />
        <HobbiesSelection hobbies={user.hobbies} handleChange={handleChange} />
        <InputField name="email" type="email" value={user.email} placeholder="Email" handleChange={handleChange} />
        <Row>
          <Col><InputField name="password" type="password" value={user.password} placeholder="Password" handleChange={handleChange} /></Col>
          <Col><InputField name="cPassword" type="password" value={user.cPassword} placeholder="Confirm Password" handleChange={handleChange} /></Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Button type="submit" color="primary" className="mx-2">{user.id ? 'Update' : 'Save'}</Button>
          <Button color="secondary" onClick={onCancel}>Cancel</Button>
        </div>
      </Form>
    </Col>
  </Row>
);

const EmployeeTable = ({ profiles, onEdit, onDelete }) => (
  <Row>
    <Col md={12}>
      <h4 className="my-3">Employee Details</h4>
      <Table hover dark>
        <thead>
          <tr>
            <th>ID</th><th>First</th><th>Last</th><th>Gender</th><th>Hobbies</th><th>Email</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td><td>{v.firstName}</td><td>{v.lastName}</td><td>{v.gender}</td><td>{v.hobbies.join(', ')}</td><td>{v.email}</td>
              <td>
                <Button color="info" size="sm" onClick={() => onEdit(v.id)}>Edit</Button>{' '}
                <Button color="danger" size="sm" onClick={() => onDelete(v.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  </Row>
);

const InputField = ({ name, type = 'text', value, placeholder, handleChange }) => (
  <FormGroup>
    <Input type={type} name={name} placeholder={placeholder} value={value} onChange={handleChange} required />
  </FormGroup>
);

const GenderSelection = ({ gender, handleChange }) => (
  <Col>
    <h5>Gender</h5>
    {['Male', 'Female', 'Other'].map((g) => (
      <FormGroup check key={g}><Label check><Input type="radio" name="gender" value={g} checked={gender === g} onChange={handleChange} /> {g}</Label></FormGroup>
    ))}
  </Col>
);

const HobbiesSelection = ({ hobbies, handleChange }) => (
  <Col>
    <h5>Hobbies</h5>
    {['Travel', 'Coding', 'Books', 'Music'].map((hobby) => (
      <FormGroup check key={hobby}><Label check><Input type="checkbox" value={hobby} checked={hobbies.includes(hobby)} onChange={handleChange} /> {hobby}</Label></FormGroup>
    ))}
  </Col>
);

export default App;
