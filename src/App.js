import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RequireAuth } from './components/RequireAuth';
import { RequireAdmin } from './components/RequireAdmin';

// other
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';
import Login from './pages/Login';

// books
import SearchBooks from './pages/Books/SearchBooks';
import ViewBook from './pages/Books/ViewBook';
import AddBook from './pages/Books/AddBook';
import EditBook from './pages/Books/EditBook';
import BookBatchUpload from './pages/Books/BookBatchUpload';

// loaners
import SearchLoaners from './pages/Loaners/SearchLoaners';
import ViewLoaner from './pages/Loaners/ViewLoaner';
import AddLoaner from './pages/Loaners/AddLoaner';
import EditLoaner from './pages/Loaners/EditLoaner';
import LoanerBatchUpload from './pages/Loaners/LoanerBatchUpload';

// librarian
import SearchLibrarians from './pages/Librarian/SearchLibrarians';
import ViewLibrarian from './pages/Librarian/ViewLibrarian';
import AddLibrarian from './pages/Librarian/AddLibrarian';
import EditLibrarian from './pages/Librarian/EditLibrarian';
import ChangePasswordLibrarian from './pages/Librarian/ChangePasswordLibrarian';

// transactions
import SearchTransactions from './pages/Transactions/SearchTransactions';
import ViewTransaction from './pages/Transactions/ViewTransaction';
import BorrowCart from './pages/Transactions/BorrowCart';
import ReturnCart from './pages/Transactions/ReturnCart';
import ExtendCart from './pages/Transactions/ExtendCart';
import SelectBorrower from './pages/Transactions/SelectBorrower';
import SelectReturner from './pages/Transactions/SelectReturner';
import SelectExtender from './pages/Transactions/SelectExtender';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<RequireAuth><Navigate to='/home' /></RequireAuth>} />
        <Route path='/home' element={<RequireAuth><Home /></RequireAuth>} />

        {/* routes for books */}
        <Route path='/books/search' element={<RequireAuth><SearchBooks /></RequireAuth>} />
        <Route path='/books/:id/view' element={<RequireAuth><ViewBook /></RequireAuth>} />
        <Route path='/books/add-book' element={<RequireAuth><RequireAdmin><AddBook /></RequireAdmin></RequireAuth>} />
        <Route path='/books/:id/edit' element={<RequireAuth><RequireAdmin><EditBook /></RequireAdmin></RequireAuth>} />

        {/* routes for loaners */}
        <Route path='/loaners/search' element={<RequireAuth><RequireAdmin><SearchLoaners /></RequireAdmin></RequireAuth>} />
        <Route path='/loaners/:id/view' element={<RequireAuth><RequireAdmin><ViewLoaner /></RequireAdmin></RequireAuth>} />
        <Route path='/loaners/add-loaner' element={<RequireAuth><RequireAdmin><AddLoaner /></RequireAdmin></RequireAuth>} />
        <Route path='/loaners/:id/edit' element={<RequireAuth><RequireAdmin><EditLoaner /></RequireAdmin></RequireAuth>} />

        {/* routes for librarian */}
        <Route path='/dashboard/librarian/search' element={<RequireAuth><RequireAdmin><SearchLibrarians /></RequireAdmin></RequireAuth>} />
        <Route path='/dashboard/librarian/:id/view' element={<RequireAuth><RequireAdmin><ViewLibrarian /></RequireAdmin></RequireAuth>} />
        <Route path='/dashboard/librarian/add-librarian' element={<RequireAuth><RequireAdmin><AddLibrarian /></RequireAdmin></RequireAuth>} />
        <Route path='/dashboard/librarian/:id/edit' element={<RequireAuth><RequireAdmin><EditLibrarian /></RequireAdmin></RequireAuth>} />
        <Route path='/dashboard/librarian/:id/change-password' element={<RequireAuth><RequireAdmin><ChangePasswordLibrarian /></RequireAdmin></RequireAuth>} />

        {/* routes for transactions */}
        <Route path='/transactions' element={<RequireAuth><RequireAdmin><SearchTransactions /></RequireAdmin></RequireAuth>} />
        <Route path='/transactions/:id/view' element={<RequireAuth><RequireAdmin><ViewTransaction /></RequireAdmin></RequireAuth>} />
        <Route path='/transactions/borrow-books' element={<RequireAuth><RequireAdmin><SelectBorrower /></RequireAdmin></RequireAuth>} />
        <Route path='/transactions/borrow-books/:id' element={<RequireAuth><RequireAdmin><BorrowCart /></RequireAdmin></RequireAuth>} />
        <Route path='/transactions/return-books' element={<RequireAuth><RequireAdmin><SelectReturner /></RequireAdmin></RequireAuth>} />
        <Route path='/transactions/return-books/:id' element={<RequireAuth><RequireAdmin><ReturnCart /></RequireAdmin></RequireAuth>} />
        <Route path='/transactions/extend-books' element={<RequireAuth><RequireAdmin><SelectExtender /></RequireAdmin></RequireAuth>} />
        <Route path='/transactions/extend-books/:id' element={<RequireAuth><RequireAdmin><ExtendCart /></RequireAdmin></RequireAuth>} />

        {/* routes for dashboard */}
        <Route path='/dashboard' element={<RequireAuth><RequireAdmin><Dashboard /></RequireAdmin></RequireAuth>} />
        <Route path='/dashboard/import/books' element={<RequireAuth><RequireAdmin><BookBatchUpload /></RequireAdmin></RequireAuth>} />
        <Route path='/dashboard/import/loaners' element={<RequireAuth><RequireAdmin><LoanerBatchUpload /></RequireAdmin></RequireAuth>} />

        {/* other routes */}
        <Route path="/login" element={<Login />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
