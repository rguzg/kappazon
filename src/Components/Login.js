import { useState, useContext } from 'react';
import { Button, Form, Alert, Col } from 'react-bootstrap';
import { UserContext } from '../context';

export default function Login({ setCurrentPage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);
  const { user, login, updateUser } = useContext(UserContext);
  return (
    <Col xs={6}>
      <Form className="mb-4">
        <h3>Welcome back!</h3>
        {errors && <Alert variant={'danger'}>{errors}</Alert>}
        <Form.Label>Email:</Form.Label>
        <input
          placeholder="Enter email"
          type="email"
          class="form-control mb-4"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></input>
        <Form.Label>Password:</Form.Label>
        <input
          placeholder="Enter password"
          type="password"
          className="form-control mb-4"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
        <Button
          variant="success"
          onClick={async () => {
            try {
              await login.bind(user)(username, password);
              setErrors(null);
              updateUser(user);
            } catch (error) {
              setErrors(error.message);
            }
          }}
        >
          Log In
        </Button>
      </Form>
      <a className="link" onClick={() => setCurrentPage('signup')}>
        Don't have an account? Sign up here!
      </a>
    </Col>
  );
}
