import { Container, Col } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context';
import CartProduct from './CartProduct';

export default function Cart() {
  const { user, accessToken, refreshToken } = useContext(UserContext);
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);

  async function getCart() {
    if (!accessToken()) {
      await refreshToken();
    }

    const response = await fetch('http://localhost:8000/api/cart', {
      headers: {
        Authorization: `Bearer ${accessToken()}`,
      },
    });

    const json = await response.json();

    setCart(json);
    setProducts(json.products);
  }

  useEffect(async () => {
    if (Object.keys(cart).length === 0) {
      await getCart();
    }
  }, []);

  return (
    <Container fluid className="mt-4">
      <h2>Cart</h2>
      <p>Total Items: {cart.total_items}</p>
      <Col xs={12} className="products">
        {products.map((product) => {
          return <CartProduct key={product.id} cartItem={product} />;
        })}
      </Col>
      <Col xs={12}>
        <div>
          <h3>Total</h3>
          <h4>${cart.total_price}</h4>
        </div>
      </Col>
    </Container>
  );
}
