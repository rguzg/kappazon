import { Container, Col } from 'react-bootstrap';
import kappazon from '../kappazon.jpeg';
import cart from '../Icons/cart.svg';
import users from '../Icons/users.svg';
import { useContext } from 'react';
import { UserContext } from '../context';

export default function Header() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Container fluid>
      <Col xs={12} className="App-header">
        <Col xs={3}>
          <div className="App-logo">
            <img src={kappazon} alt="kappazon" height={50} width={50} />
            <h2>Kappazon</h2>
          </div>
        </Col>
        {isLoggedIn && (
          <Col xs={3}>
            <div className="App-buttons">
              <img
                src={cart}
                alt="kappazon"
                height={50}
                width={50}
                style={{ padding: '0 8px' }}
              />
              <img
                src={users}
                alt="kappazon"
                height={50}
                width={50}
                style={{ padding: '0 8px' }}
              />
            </div>
          </Col>
        )}
      </Col>
    </Container>
  );
}
