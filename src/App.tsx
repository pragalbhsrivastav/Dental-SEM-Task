import React from 'react';
import GoogleReviews from './components/GoogleReviews';
import './App.css';

const App: React.FC = () => {

  return (
    <div className="App">
      <GoogleReviews placeId="ChIJl_cDBvUZDTkRMuZdb5KB0lg" />
    </div>

  );
};

export default App;