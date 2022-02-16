import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SearchBooks from './pages/Books/SearchBooks';
import AddBook from './pages/Books/AddBook';
import SearchLoaners from './pages/Loaners/SearchLoaners';
import ViewLoaner from './pages/Loaners/ViewLoaner';
import AddLoaner from './pages/Loaners/AddLoaner';
import ViewBook from './pages/Books/ViewBook';
import SearchTransactions from './pages/Transactions/SearchTransactions';
import Error from './pages/Error';
import BorrowCart from './pages/Loaners/BorrowCart';
import SelectBorrower from './pages/Loaners/SelectBorrower';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/loaners/borrow-books/:id' element={<BorrowCart />} />
        <Route path='/loaners/borrow-books' element={<SelectBorrower />} />
        <Route path='/home' element={<Home />} />
        <Route path='/books/search' element={<SearchBooks />} />
        <Route path='/books/:id/' element={<ViewBook />} />
        {/* <Route path='/books/:id/edit' element={<ViewBook />} /> */}
        <Route path='/books/add-book' element={<AddBook />} />
        <Route path='/loaners/search' element={<SearchLoaners />} />
        <Route path='/loaners/:id/view' element={<ViewLoaner />} />
        {/* <Route path='/loaners/:id/edit' element={<EditLoaner />} /> */}
        <Route path='/loaners/add-loaner' element={<AddLoaner />} />
        <Route path='/transactions' element={<SearchTransactions />} />
        {/* <Route path='/transactions/:id/view' element={<ViewTransaction />} /> */}
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
