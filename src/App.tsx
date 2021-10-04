import React from 'react';
import Navigation from './components/Nav/Navigation';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Navigation title={'Nested categories'}/>
      <main>
        <Home/>
      </main>
    </>
  );
}

export default App;
