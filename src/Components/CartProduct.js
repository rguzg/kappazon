import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context';
import { Card, Button } from 'react-bootstrap';

export default function CartProduct({ cartItem }) {
  const { accessToken, refreshToken } = useContext(UserContext);
  const [currentAmount, setCurrentAmount] = useState(1);

  async function updateCart() {
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
        product: cartItem.product.id.replaceAll('-', ''),
        quantity: currentAmount,
      }),
    });

    if (response.status === 200) {
      alert('Product modified');
    } else {
      let json = await response.json();

      alert('Something went wrong: ' + json.message);
    }
  }

  return (
    <Card style={{ width: '18rem', margin: '8px' }}>
      <Card.Img
        alt={cartItem.product.name}
        variant="top"
        src={cartItem.product.image_url}
      />
      <Card.Body>
        <Card.Title>{cartItem.product.name}</Card.Title>
        <Card.Text>{cartItem.product.description}</Card.Text>
        <small>In cart: {cartItem.quantity}</small>
        <div className="mt-4" style={{ display: 'flex' }}>
          <input
            type="number"
            min={0}
            max={cartItem.product.inventory}
            className="form-control"
            style={{ width: '50px', 'margin-right': '20px' }}
            onChange={(event) => {
              setCurrentAmount(event.target.value);
            }}
          ></input>
          <Button variant="success" onClick={updateCart}>
            Update
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
