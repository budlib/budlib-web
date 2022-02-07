import React from 'react';
import logo from './logo.jpg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import SearchBooks from './pages/Books/SearchBooks';
import Transactions from './pages/Transactions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/components/:type/:subtype/:name'>
          <ComponentRenderer />
        </Route>
        <Route path='/components/:type/:name'>
          <ComponentRenderer />
        </Route> */}
        <Route path='/books/search' element={<SearchBooks />} />
        <Route path='/transactions' element={<Transactions />} />

        {/* <Route path='*'>
          <ErrorPage />
        </Route> */}
        {/* <Route path='/thank-you'>
          <ThankYouPage />
        </Route>
        <Route path='/'>
          <MainLandingPage />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
