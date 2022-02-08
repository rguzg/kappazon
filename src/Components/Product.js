import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context';
import { Card, Button } from 'react-bootstrap';

export default function Products({ product }) {
  const { accessToken, refreshToken } = useContext(UserContext);
  const [currentAmount, setCurrentAmount] = useState(1);

  async function addToCart() {
    if (!accessToken()) {
      await refreshToken();
    }

    const response = await fetch('http://localhost:8000/api/cart', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product: product.id,
        quantity: currentAmount,
      }),
    });

    if (response.status === 200) {
      alert('Product added to cart');
    } else {
      let json = await response.json();

      alert('Something went wrong: ' + json.message);
    }
  }

  return (
    <Card style={{ width: '18rem', margin: '8px' }}>
      <Card.Img alt={product.name} variant="top" src={product.image_url} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <small>Currently available: {product.inventory}</small>
        <div className="mt-4" style={{ display: 'flex' }}>
          <Button variant="success" onClick={addToCart}>
            Add to cart
          </Button>
          <input
            value={1}
            type="number"
            min={1}
            max={product.inventory}
            className="form-control"
            style={{ width: '50px', 'margin-left': '20px' }}
            onChange={(event) => {
              setCurrentAmount(event.target.value);
            }}
          ></input>
        </div>
      </Card.Body>
    </Card>
  );
}
