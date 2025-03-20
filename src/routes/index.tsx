import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import OrderDetails from '../components/OrderDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order/:orderId" element={<OrderDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
