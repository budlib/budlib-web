import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SearchBooks from './pages/Books/SearchBooks';
import ViewBook from './pages/Books/ViewBook';
import AddBook from './pages/Books/AddBook';
import EditBook from './pages/Books/EditBook';
import SearchLoaners from './pages/Loaners/SearchLoaners';
import ViewLoaner from './pages/Loaners/ViewLoaner';
import AddLoaner from './pages/Loaners/AddLoaner';
import EditLoaner from './pages/Loaners/EditLoaner';
import SearchTransactions from './pages/Transactions/SearchTransactions';
import BorrowCart from './pages/Loaners/BorrowCart';
import SelectBorrower from './pages/Loaners/SelectBorrower';
import SelectReturner from './pages/Loaners/SelectReturner';
import ReturnCart from './pages/Loaners/ReturnCart';
import Error from './pages/Error';
import Login from './pages/Login';

import { RequireAuth } from './components/RequireAuth';
import SelectExtender from './pages/Loaners/SelectExtender';
import ExtendCart from './pages/Loaners/ExtendCart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RequireAuth><Navigate to='/home' /></RequireAuth>} />
        <Route path='/home' element={<RequireAuth><Home /></RequireAuth>} />
        <Route path='/books/search' element={<RequireAuth><SearchBooks /></RequireAuth>} />
        <Route path='/books/:id/view' element={<RequireAuth><ViewBook /></RequireAuth>} />
        <Route path='/books/add-book' element={<RequireAuth><AddBook /></RequireAuth>} />
        <Route path='/books/:id/edit' element={<RequireAuth><EditBook /></RequireAuth>} />
        <Route path='/loaners/search' element={<RequireAuth><SearchLoaners /></RequireAuth>} />
        <Route path='/loaners/:id/view' element={<RequireAuth><ViewLoaner /></RequireAuth>} />
        <Route path='/loaners/add-loaner' element={<RequireAuth><AddLoaner /></RequireAuth>} />
        <Route path='/loaners/:id/edit' element={<RequireAuth><EditLoaner /></RequireAuth>} />
        <Route path='/transactions' element={<RequireAuth><SearchTransactions /></RequireAuth>} />
        {/* <Route path='/transactions/:id/view' element={<ViewTransaction />} /> */}
        <Route path='/loaners/return-books/:id' element={<RequireAuth><ReturnCart /></RequireAuth>} />
        <Route path='/loaners/return-books' element={<RequireAuth><SelectReturner /></RequireAuth>} />
        <Route path='/loaners/borrow-books/:id' element={<RequireAuth><BorrowCart /></RequireAuth>} />
        <Route path='/loaners/borrow-books' element={<RequireAuth><SelectBorrower /></RequireAuth>} />
        <Route path='/loaners/extend-books/:id' element={<RequireAuth><ExtendCart /></RequireAuth>} />
        <Route path='/loaners/extend-books' element={<RequireAuth><SelectExtender /></RequireAuth>} />
        <Route path='/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/login" element={<Login />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
