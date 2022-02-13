import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// pages
import Home from './pages/Home';
import SearchBooks from './pages/Books/SearchBooks';
import AddBook from './pages/Books/AddBook';
import SearchLoaners from './pages/Loaners/SearchLoaners';
import ViewLoaner from './pages/Loaners/ViewLoaner';
import AddLoaner from './pages/Loaners/AddLoaner';
import SearchTransactions from './pages/Transactions/SearchTransactions';
import Error from './pages/Error';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/books/search' element={<SearchBooks />} />
        {/* <Route path='/books/:id' element={<ViewBook />} /> */}
        {/* <Route path='/books/:id/view' element={<ViewBook />} /> */}
        <Route path='/books/add-book' element={<AddBook />} />
        <Route path='/loaners/search' element={<SearchLoaners />} />
        <Route path='/loaners/:id' element={<ViewLoaner />} />
        <Route path='/loaners/:id/view' element={<ViewLoaner />} />
        {/* <Route path='/loaners/:id/edit' element={<EditLoaner />} /> */}
        <Route path='/loaners/add-loaner' element={<AddLoaner />} />
        <Route path='/transactions' element={<SearchTransactions />} />
        {/* <Route path='/transactions/:id' element={<ViewTransaction />} /> */}
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
