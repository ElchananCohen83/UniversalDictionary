import React from 'react';
import Footer from './components/Footer';
import Navigate from './utils/useNavigate';

function Homepage() {
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={Navigate('/login')}>Login</button>
      <Footer />
    </div>
  );
}

export default Homepage;