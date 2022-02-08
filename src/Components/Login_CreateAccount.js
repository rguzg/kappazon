import { Container, Col } from 'react-bootstrap';
import kappazon_circle from '../kappazon_circle.jpeg';
import Login from './Login';
import CreateAccount from './CreateAccount';
import { useState } from 'react';

export default function Header() {
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <Container fluid style={{ display: 'flex' }}>
      <Col xs={6} className="Kappazon_Welcome">
        <h1>Welcome to Kappazon!</h1>
        <img src={kappazon_circle} alt="kappazon" />
      </Col>
      <Col xs={6} className="Kappazon_Welcome">
        {currentPage === 'login' ? (
          <Login setCurrentPage={setCurrentPage} />
        ) : (
          <CreateAccount setCurrentPage={setCurrentPage} />
        )}
      </Col>
    </Container>
  );
}
