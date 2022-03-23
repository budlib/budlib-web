import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RequireAuth } from './components/RequireAuth';

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

// loaners
import SearchLoaners from './pages/Loaners/SearchLoaners';
import ViewLoaner from './pages/Loaners/ViewLoaner';
import AddLoaner from './pages/Loaners/AddLoaner';
import EditLoaner from './pages/Loaners/EditLoaner';

// librarian
import SearchLibrarians from './pages/Librarian/SearchLibrarians';
import ViewLibrarian from './pages/Librarian/ViewLibrarian';
import AddLibrarian from './pages/Librarian/AddLibrarian';
import EditLibrarian from './pages/Librarian/EditLibrarian';
import ChangePasswordLibrarian from './pages/Librarian/ChangePasswordLibrarian';

// transactions
import SearchTransactions from './pages/Transactions/SearchTransactions';
// import ViewTransaction from './pages/Transactions/ViewTransaction';
import BorrowCart from './pages/Loaners/BorrowCart';
import ReturnCart from './pages/Loaners/ReturnCart';
import ExtendCart from './pages/Loaners/ExtendCart';
import SelectBorrower from './pages/Loaners/SelectBorrower';
import SelectReturner from './pages/Loaners/SelectReturner';
import SelectExtender from './pages/Loaners/SelectExtender';

// batch processing
import BookBatchUpload from './pages/Books/BookBatchUpload';
import LoanerBatchUpload from './pages/Loaners/LoanerBatchUpload';


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<RequireAuth><Navigate to='/home' /></RequireAuth>} />
        <Route path='/home' element={<RequireAuth><Home /></RequireAuth>} />

        {/* routes for books */}
        <Route path='/books/search' element={<RequireAuth><SearchBooks /></RequireAuth>} />
        <Route path='/books/:id/view' element={<RequireAuth><ViewBook /></RequireAuth>} />
        <Route path='/books/add-book' element={<RequireAuth><AddBook /></RequireAuth>} />
        <Route path='/books/:id/edit' element={<RequireAuth><EditBook /></RequireAuth>} />

        {/* routes for loaners */}
        <Route path='/loaners/search' element={<RequireAuth><SearchLoaners /></RequireAuth>} />
        <Route path='/loaners/:id/view' element={<RequireAuth><ViewLoaner /></RequireAuth>} />
        <Route path='/loaners/add-loaner' element={<RequireAuth><AddLoaner /></RequireAuth>} />
        <Route path='/loaners/:id/edit' element={<RequireAuth><EditLoaner /></RequireAuth>} />

        {/* routes for librarian */}
        <Route path='/dashboard/librarian/search' element={<RequireAuth><SearchLibrarians /></RequireAuth>} />
        <Route path='/dashboard/librarian/:id/view' element={<RequireAuth><ViewLibrarian /></RequireAuth>} />
        <Route path='/dashboard/librarian/add-librarian' element={<RequireAuth><AddLibrarian /></RequireAuth>} />
        <Route path='/dashboard/librarian/:id/edit' element={<RequireAuth><EditLibrarian /></RequireAuth>} />
        <Route path='/dashboard/librarian/:id/change-password' element={<RequireAuth><ChangePasswordLibrarian /></RequireAuth>} />

        {/* routes for transactions */}
        <Route path='/transactions' element={<RequireAuth><SearchTransactions /></RequireAuth>} />
        {/* <Route path='/transactions/:id/view' element={<ViewTransaction />} /> */}
        <Route path='/loaners/return-books/:id' element={<RequireAuth><ReturnCart /></RequireAuth>} />
        <Route path='/loaners/return-books' element={<RequireAuth><SelectReturner /></RequireAuth>} />
        <Route path='/loaners/borrow-books/:id' element={<RequireAuth><BorrowCart /></RequireAuth>} />
        <Route path='/loaners/borrow-books' element={<RequireAuth><SelectBorrower /></RequireAuth>} />
        <Route path='/loaners/extend-books/:id' element={<RequireAuth><ExtendCart /></RequireAuth>} />
        <Route path='/loaners/extend-books' element={<RequireAuth><SelectExtender /></RequireAuth>} />

        {/* routes for dashboard */}
        <Route path='/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path='/dashboard/import/books' element={<RequireAuth><BookBatchUpload /></RequireAuth>} />
        <Route path='/dashboard/import/loaners' element={<RequireAuth><LoanerBatchUpload /></RequireAuth>} />

        {/* other routes */}
        <Route path="/login" element={<Login />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
