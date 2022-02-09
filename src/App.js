import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// pages
import Home from './pages/Home';
import SearchBooks from './pages/Books/SearchBooks';
import SearchLoaners from './pages/Loaners/SearchLoaners';
import ViewLoaner from './pages/Loaners/ViewLoaner';
import Transactions from './pages/Transactions';
import Error from './pages/Error';

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
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/books/search' element={<SearchBooks />} />
        <Route path='/loaners/search' element={<SearchLoaners />} />
        <Route path='/loaners/view/:id' element={<ViewLoaner />} />
        <Route path='/transactions' element={<Transactions />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
