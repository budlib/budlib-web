import React, { useState } from 'react';
import { useFetch } from '../../helpers/useFetch';
import { useParams, useNavigate } from 'react-router-dom';
import { postCall } from '../../helpers/postCall';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollTop from '../../components/ScrollTop';
import ModalLogout from '../../components/ModalLogout';

function todayDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = dd + '-' + mm + '-' + yyyy;
  return today;
}

function displayDate(dueDateString) {
  // bullet proof solution from https://stackoverflow.com/a/22835394
  let dueDateParts = dueDateString.split('-');
  let dueDate = new Date(dueDateParts[0], dueDateParts[1] - 1, dueDateParts[2]);

  let dd = String(dueDate.getDate()).padStart(2, '0');
  let mm = String(dueDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = dueDate.getFullYear();

  dueDate = dd + '-' + mm + '-' + yyyy;
  return dueDate;
}

const ReturnCart = () => {
  let navigate = useNavigate();

  const currTransactionType = 'RETURN';

  const { id: loanerId } = useParams();
  let loanerDetailUrl = `/api/loaners/${loanerId}`;
  const { data: loanerData } = useFetch(loanerDetailUrl);

  let currentLoansUrl = `/api/loaners/${loanerId}/loans`;
  const { data: currentLoans } = useFetch(currentLoansUrl);

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
        window.alert('No more copies to return');
      } else {
        // adding extra properties loanId and dueDate for processing
        newCart.push({
          book: {
            bookId: parseInt(st[0]),
            title: st[1],
          },
          copies: 1,
          loanId: parseInt(st[3]),
          dueDate: st[4],
        });

        setCartBookCopies([...newCart]);
      }
    } else {
      if (parseInt(st[2]) < 1) {
        window.alert('No more copies to return');
      } else {
        for (let i = 0; i < newCart.length; i++) {
          if (newCart[i]['loanId'] === parseInt(st[3])) {
            if (newCart[i]['copies'] < parseInt(st[2])) {
              newCart[i]['copies'] = parseInt(newCart[i]['copies']) + 1;

              setCartBookCopies([...newCart]);
            } else {
              window.alert('No more copies to return');
            }

            flag = true;
          }
        }

        if (flag === false) {
          // adding extra properties loanId and dueDate for processing
          newCart.push({
            book: {
              bookId: parseInt(st[0]),
              title: st[1],
            },
            copies: 1,
            loanId: parseInt(st[3]),
            dueDate: st[4],
          });
        }

        setCartBookCopies([...newCart]);
      }
    }
  }

  function handleMinus(e) {
    let newCart = cartBookCopies;

    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i]['loanId'] === parseInt(e.target.value)) {
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
      if (newCart[i]['loanId'] === parseInt(e.target.value)) {
        let borrQty = document.getElementById(`${e.target.value}_borrQty`).innerText;

        if (newCart[i]['copies'] < borrQty) {
          newCart[i]['copies'] = parseInt(newCart[i]['copies']) + 1;
          setCartBookCopies([...newCart]);
        } else {
          window.alert('No more copies to return');
        }
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (cartBookCopies.length === 0) {
      window.alert('No books in cart to return');
      return;
    }

    // now delete extra properties used for display
    let newCart = cartBookCopies;
    for (let i = 0; i < newCart.length; i++) {
      delete newCart[i]['loanId'];
      delete newCart[i]['dueDate'];
    }

    let sendDetails = { ...trnPayload, bookCopies: newCart };

    postCall(`/api/transactions`, sendDetails).then((result) => {
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
            <Header heading='Return books' />

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
                          <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formDueDate'>
                            Return date
                          </label>
                          <div className='col-sm-8'>
                            <div className='form-control' style={{ margin: '0', overflow: 'hidden', backgroundColor: '#eaecf4', opacity: '1', boxSizing: 'border-box' }}>
                              {todayDate()}
                            </div>
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
                                        <th style={{ width: '55%' }}>Titles in the cart</th>
                                        <th>Due date</th>
                                        <th>Copies</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {cartBookCopies?.map((eachBook) => {
                                        const { book, copies, loanId, dueDate } = eachBook;

                                        return (
                                          <tr key={loanId}>
                                            <td className='pt-3' style={{ width: '55%' }}>
                                              {book['title']}
                                            </td>
                                            <td className='pt-3' style={{ width: '20%' }}>
                                              {displayDate(dueDate)}
                                            </td>
                                            <td>
                                              <div className='btn-group btn-group-sm' role='group'>
                                                <button type='button' className='btn btn-secondary btn-circle' style={{ fontSize: '1.3em' }} value={loanId} onClick={(e) => handleMinus(e)}>
                                                  &#8722;
                                                </button>
                                                <span className='btn disabled text-dark border-top border-bottom' style={{ boxSizing: 'content-box', minWidth: '1.5em' }}>
                                                  {copies}
                                                </span>
                                                <button type='button' className='btn btn-secondary btn-circle' style={{ fontSize: '1.3em' }} value={loanId} onClick={(e) => handlePlus(e)}>
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
                  <div className='card shadow mb-4'>
                    <div className='card-body'>
                      {currentLoans.length === 0 ? (
                        <div className='text-secondary pt-2 text-center'>No outstanding loans</div>
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
                              {currentLoans?.map((dataItem) => {
                                let { loanId, book, copies, dueDate } = dataItem;
                                let { bookId, title } = book;

                                return (
                                  <tr key={loanId}>
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
                                    <td id={`${loanId}_borrQty`}>{copies}</td>
                                    <td style={{ textAlign: 'center' }}>
                                      <button
                                        className='btn btn-sm btn-circle btn-outline-primary'
                                        style={{ fontSize: '1.4em' }}
                                        value={bookId + '@@' + title + '@@' + copies + '@@' + loanId + '@@' + dueDate}
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

export default ReturnCart;
