import React from 'react';
import './styles/reset.css';
import './styles/App.css';
import { Route } from 'react-router-dom';
import { Main } from 'pages';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Main} />
    </div>
  );
}

export default App;
