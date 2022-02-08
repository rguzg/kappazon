import { useState, useContext } from 'react';
import { Button, Form, Alert, Col } from 'react-bootstrap';
import { UserContext } from '../context';

export default function SignUp({ setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState(null);
  const { user, login, updateUser } = useContext(UserContext);

  async function CreateAccount() {
    try {
      let response = await fetch(
        'http://localhost:8000/api/users/create_customer',
        {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
            first_name: firstName,
            last_name: lastName,
            birthdate,
            gender,
            image_url:
              'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.ej0jPb_9vAGozpivOyYTbQHaFj%26pid%3DApi&f=1',
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      let json = await response.json();

      if (response.status !== 200) {
        let errors = {};

        for (const key in json) {
          errors[key] = json[key][0];
        }

        setErrors(errors);
      } else {
        await login.bind(user)(email, password);
        setErrors(null);
        updateUser(user);
      }
    } catch (error) {
      setErrors({ error: error.message });
    }
  }

  return (
    <Col xs={6}>
      <Form className="mb-4">
        <h3>Welcome!</h3>
        {errors && (
          <Alert variant={'danger'}>
            {Object.keys(errors).map((error) => (
              <p key={error}>{`${error} field: ${errors[error]}`}</p>
            ))}
          </Alert>
        )}
        <Form.Label>Email:</Form.Label>
        <input
          placeholder="Enter email"
          type="email"
          class="form-control mb-4"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          required
        ></input>
        <Form.Label>Password:</Form.Label>
        <input
          placeholder="Enter password"
          type="password"
          className="form-control mb-4"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          required
        ></input>
        <Form.Label>First Name:</Form.Label>
        <input
          placeholder="John"
          type="text"
          className="form-control mb-4"
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
          required
        ></input>
        <Form.Label>Last Name:</Form.Label>
        <input
          placeholder="Doe"
          type="text"
          className="form-control mb-4"
          onChange={(event) => {
            setLastName(event.target.value);
          }}
          required
        ></input>
        <Form.Label>Birthdate:</Form.Label>
        <input
          placeholder="03/12/2019"
          type="date"
          className="form-control mb-4"
          onChange={(event) => {
            setBirthdate(event.target.value);
          }}
          required
        ></input>
        <Form.Label>Gender:</Form.Label>
        <select
          required
          onChange={(event) => {
            setGender(event.target.value);
          }}
          className="form-control mb-4"
        >
          <option value={'M'}>Male</option>
          <option value={'F'}>Female</option>
          <option value={'NB'}>Non-Binary</option>
        </select>
        <Button variant="success" onClick={CreateAccount}>
          Log In
        </Button>
      </Form>
      <a className="link" onClick={() => setCurrentPage('login')}>
        Already have an account? Log in here!
      </a>
    </Col>
  );
}
