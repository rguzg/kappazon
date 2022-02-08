import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './Products';
import Cart from './Cart';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}
