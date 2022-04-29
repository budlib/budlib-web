import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookMiniSearchBar from '../../components/BookMiniSearchBar';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ModalLogout from '../../components/ModalLogout';
import ScrollTop from '../../components/ScrollTop';
import Sidebar from '../../components/Sidebar';
import { postCall } from '../../helpers/postCall';
import { useFetch } from '../../helpers/useFetch';

function todayDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  return today;
}

function defaultDueDate() {
  let target = new Date();
  target.setDate(target.getDate() + 28);

  let dd = String(target.getDate()).padStart(2, '0');
  let mm = String(target.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = target.getFullYear();

  target = yyyy + '-' + mm + '-' + dd;
  return target;
}

const BorrowCart = () => {
  let navigate = useNavigate();

  const currTransactionType = 'BORROW';

  const { id: loanerId } = useParams();
  let loanerDetailUrl = `/api/loaners/${loanerId}`;
  const { data: loanerData } = useFetch(loanerDetailUrl);

  let bookUrl = '/api/books';
  const [psearchBy, setSearchBy] = useState(['', '']);

  let thisUrl = bookUrl + '?searchBy=' + psearchBy[0] + '&searchTerm=' + psearchBy[1];
  const { data } = useFetch(thisUrl);

  const [borrowDate, setBorrowDate] = useState(todayDate());
  const [dueDate, setDueDate] = useState(defaultDueDate());
  const [cartBookCopies, setCartBookCopies] = useState([]);

  const trnPayload = {
    transactionType: currTransactionType,
    loaner: {
      loanerId: loanerId,
    },
    librarian: {
      librarianId: window.localStorage.getItem('id'),
    },
    bookCopies: [],
  };

  function handleAddition(e) {
    let st = e.target.value.split('@@');
    let flag = false;
    let newCart = cartBookCopies;

    if (newCart.length === 0) {
      if (parseInt(st[2]) < 1) {
        window.alert('No copies availabile');
      } else {
        newCart.push({
          book: {
            bookId: parseInt(st[0]),
            title: st[1],
          },
          copies: 1,
        });

        setCartBookCopies([...newCart]);
      }
    } else {
      if (parseInt(st[2]) < 1) {
        window.alert('No copies availabile');
      } else {
        for (let i = 0; i < newCart.length; i++) {
          if (newCart[i]['book']['bookId'] === parseInt(st[0])) {
            if (newCart[i]['copies'] < parseInt(st[2])) {
              newCart[i]['copies'] = parseInt(newCart[i]['copies']) + 1;

              setCartBookCopies([...newCart]);
            } else {
              window.alert('No more copies availabile');
            }

            flag = true;
          }
        }

        if (flag === false) {
          newCart.push({
            book: {
              bookId: parseInt(st[0]),
              title: st[1],
            },
            copies: 1,
          });
        }

        setCartBookCopies([...newCart]);
      }
    }
  }

  function handleMinus(e) {
    let newCart = cartBookCopies;

    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i]['book']['bookId'] === parseInt(e.target.value)) {
        newCart[i]['copies'] = parseInt(newCart[i]['copies']) - 1;

        if (newCart[i]['copies'] === 0) {
          newCart.splice(i, 1);
        }

        setCartBookCopies([...newCart]);
      }
    }
  }

  function handlePlus(e) {
    let newCart = cartBookCopies;

    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i]['book']['bookId'] === parseInt(e.target.value)) {
        let avaQty = document.getElementById(`${e.target.value}_avaQty`).innerText;

        if (newCart[i]['copies'] < avaQty) {
          newCart[i]['copies'] = parseInt(newCart[i]['copies']) + 1;
          setCartBookCopies([...newCart]);
        } else {
          window.alert('No more copies availabile');
        }
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (cartBookCopies.length === 0) {
      window.alert('No books in cart to borrow');
      return;
    }

    let sendBorrowDate = borrowDate.replaceAll('-', '');
    let sendDueDate = dueDate.replaceAll('-', '');

    let sendDetails = { ...trnPayload, bookCopies: cartBookCopies };

    postCall(`/api/transactions?borrowDate=${sendBorrowDate}&dueDate=${sendDueDate}`, sendDetails).then((result) => {
      window.alert(result['data']['message']);

      if (result['status'] === 200) {
        navigate(`/loaners/${loanerId}/view`);
      }
    });
  }

  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading='Borrow books' />

            <div className='container-fluid'>
              <div className='row'>
                <div className='col-lg-7'>
                  <div className='card shadow mb-4 p-3 text-dark'>
                    <div className='card-body'>
                      <form id='loanerForm' onSubmit={handleSubmit}>
                        <div className='form-group row'>
                          <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formTrnType'>
                            Transaction type
                          </label>
                          <div className='col-sm-8'>
                            <div className='form-control' style={{ margin: '0', overflow: 'hidden', backgroundColor: '#eaecf4', opacity: '1', boxSizing: 'border-box' }}>
                              {currTransactionType}
                            </div>
                          </div>
                        </div>

                        <div className='form-group row'>
                          <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formLoanerId'>
                            Loaner ID
                          </label>
                          <div className='col-sm-8'>
                            <div className='form-control' style={{ margin: '0', overflow: 'hidden', backgroundColor: '#eaecf4', opacity: '1', boxSizing: 'border-box' }}>
                              {loanerId}
                            </div>
                          </div>
                        </div>

                        <div className='form-group row'>
                          <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formLoanerName'>
                            Loaner's full name
                          </label>
                          <div className='col-sm-8'>
                            <div className='form-control' style={{ margin: '0', overflow: 'hidden', backgroundColor: '#eaecf4', opacity: '1', boxSizing: 'border-box' }}>
                              {loanerData['fullNameWithSalutation']}
                            </div>
                          </div>
                        </div>

                        <div className='form-group row'>
                          <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formOutstandingBooks'>
                            Outstanding books
                          </label>
                          <div className='col-sm-8'>
                            <div className='form-control' style={{ margin: '0', overflow: 'hidden', backgroundColor: '#eaecf4', opacity: '1', boxSizing: 'border-box' }}>
                              {loanerData['totalOutstanding']}
                            </div>
                          </div>
                        </div>

                        <div className='form-group row'>
                          <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formBorrowDate'>
                            Borrow date
                          </label>
                          <div className='col-sm-8'>
                            <input
                              type='date'
                              className='form-control'
                              id='formBorrowDate'
                              name='formBorrowDate'
                              value={borrowDate}
                              onChange={(e) => {
                                setBorrowDate(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className='form-group row'>
                          <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formDueDate'>
                            Due date
                          </label>
                          <div className='col-sm-8'>
                            <input
                              type='date'
                              className='form-control'
                              id='formDueDate'
                              name='formDueDate'
                              value={dueDate}
                              onChange={(e) => {
                                setDueDate(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className='border rounded p-2 mb-4'>
                          <div className='row form-group'>
                            <div className='col-sm-12'>
                              {cartBookCopies.length === 0 ? (
                                <div className='text-secondary pt-2 text-center'>Empty cart</div>
                              ) : (
                                <div className='table-responsive'>
                                  <table className='table'>
                                    <thead className='table-light text-dark'>
                                      <tr>
                                        <th style={{ width: '70%' }}>Titles in the cart</th>
                                        <th>Copies</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {cartBookCopies?.map((eachBook) => {
                                        const { book, copies } = eachBook;

                                        return (
                                          <tr key={book['bookId']}>
                                            <td className='pt-3' style={{ width: '70%' }}>
                                              {book['title']}
                                            </td>
                                            <td>
                                              <div className='btn-group btn-group-sm' role='group'>
                                                <button type='button' className='btn btn-secondary btn-circle' style={{ fontSize: '1.3em' }} value={book['bookId']} onClick={(e) => handleMinus(e)}>
                                                  &#8722;
                                                </button>
                                                <span className='btn disabled text-dark border-top border-bottom' style={{ boxSizing: 'content-box', minWidth: '1.5em' }}>
                                                  {copies}
                                                </span>
                                                <button type='button' className='btn btn-secondary btn-circle' style={{ fontSize: '1.3em' }} value={book['bookId']} onClick={(e) => handlePlus(e)}>
                                                  &#43;
                                                </button>
                                              </div>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <button type='submit' className='btn btn-primary my-2'>
                          Complete transaction
                        </button>
                        <button
                          type='button'
                          className='btn btn-outline-danger mx-4 my-2'
                          onClick={() => {
                            let path = `/home`;
                            navigate(path);
                          }}
                        >
                          Cancel
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className='col-lg-5'>
                  <BookMiniSearchBar func={setSearchBy} />

                  <div className='card shadow mb-4'>
                    <div className='card-body'>
                      {data.length === 0 ? (
                        <div className='text-secondary pt-2 text-centerr'>No books found</div>
                      ) : (
                        <div className='table-responsive'>
                          <table className='table table-bordered table-hover' id='dataTable' width='100%' cellSpacing='0' style={{ tableLayout: 'fixed' }}>
                            <thead className='table-secondary text-dark'>
                              <tr className='o-hidden'>
                                <th style={{ width: '70%' }}>Title</th>
                                <th>Qty</th>
                                <th>Add</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data?.map((dataItem) => {
                                let { bookId, title, availableQuantity } = dataItem;

                                return (
                                  <tr key={bookId}>
                                    <td
                                      style={{
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        WebkitLineClamp: '1',
                                        lineClamp: '1',
                                      }}
                                    >
                                      {title}
                                    </td>
                                    <td id={`${bookId}_avaQty`}>{availableQuantity}</td>
                                    <td style={{ textAlign: 'center' }}>
                                      <button
                                        className='btn btn-sm btn-circle btn-outline-primary'
                                        style={{ fontSize: '1.4em' }}
                                        value={bookId + '@@' + title + '@@' + availableQuantity}
                                        onClick={(e) => handleAddition(e)}
                                      >
                                        &#43;
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>

      <ScrollTop />
      <ModalLogout />
    </React.Fragment>
  );
};

export default BorrowCart;
