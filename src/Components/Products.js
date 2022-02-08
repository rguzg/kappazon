import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context';
import Product from './Product';
import { Container, Col } from 'react-bootstrap';

export default function Products() {
  const { user, accessToken, refreshToken } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  async function getProducts() {
    if (!accessToken()) {
      await refreshToken();
    }

    const response = await fetch('http://localhost:8000/api/products', {
      headers: {
        Authorization: `Bearer ${accessToken()}`,
      },
    });

    const json = await response.json();

    setProducts(json);
  }

  useEffect(() => {
    if (!products.length) {
      getProducts();
    }
  }, []);

  return (
    <Container fluid className="mt-4">
      <Col xs={12} className="products">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </Col>
    </Container>
  );
}
