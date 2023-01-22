import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ModalLogout from '../../components/ModalLogout';
import ScrollTop from '../../components/ScrollTop';
import Sidebar from '../../components/Sidebar';
import { postCall } from '../../helpers/postCall';
import { useFetch } from '../../helpers/useFetch';
import { useTranslation } from 'react-i18next';

function defaultDueDate() {
  let target = new Date();
  target.setDate(target.getDate() + 28);

  let dd = String(target.getDate()).padStart(2, '0');
  let mm = String(target.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = target.getFullYear();

  target = yyyy + '-' + mm + '-' + dd;
  return target;
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

const ExtendCart = () => {
  const { t } = useTranslation('transactions');
  let navigate = useNavigate();

  const currTransactionType = 'EXTEND';

  const { id: loanerId } = useParams();
  let loanerDetailUrl = `/api/loaners/${loanerId}`;
  const { data: loanerData } = useFetch(loanerDetailUrl);

  let currentLoansUrl = `/api/loaners/${loanerId}/loans`;
  const { data: currentLoans } = useFetch(currentLoansUrl);

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
        window.alert(t('noBooksToExtend'));
      } else {
        // adding extra properties loanId and dueDate for processing
        newCart.push({
          book: {
            bookId: parseInt(st[0]),
            title: st[1],
          },
          copies: st[2],
          loanId: parseInt(st[3]),
          dueDate: st[4],
        });

        setCartBookCopies([...newCart]);
      }
    } else {
      if (parseInt(st[2]) < 1) {
        window.alert(t('noBooksToExtend'));
      } else {
        for (let i = 0; i < newCart.length; i++) {
          if (newCart[i]['loanId'] === parseInt(st[3])) {
            window.alert(t('alreadyInCart'));

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
            copies: st[2],
            loanId: parseInt(st[3]),
            dueDate: st[4],
          });
        }

        setCartBookCopies([...newCart]);
      }
    }
  }

  function handleRemove(e) {
    let newCart = cartBookCopies;

    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i]['loanId'] === parseInt(e.target.value)) {
        newCart.splice(i, 1);

        setCartBookCopies([...newCart]);
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (cartBookCopies.length === 0) {
      window.alert(t('noBooksInCartToExtend'));
      return;
    }

    // now delete extra properties used for display
    let newCart = JSON.parse(JSON.stringify(cartBookCopies));
    for (let i = 0; i < newCart.length; i++) {
      delete newCart[i]['loanId'];
      delete newCart[i]['dueDate'];
    }

    let sendDueDate = dueDate.replaceAll('-', '');
    let sendDetails = { ...trnPayload, bookCopies: newCart };

    postCall(`/api/transactions?dueDate=${sendDueDate}`, sendDetails).then((result) => {
      const status = result['status'];
      window.alert(t(
        [`completeRes.${status}`, 'completeRes.unspecific'],
        {errorMessage: result['data']['message']}
      ));

      if (status === 200) {
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
            <Header heading={t('extendLoan')} />

            <div className='container-fluid'>
              <div className='row'>
                <div className='col-lg-7'>
                  <div className='card shadow mb-4 p-3 text-dark'>
                    <div className='card-body'>
                      <form id='loanerForm' onSubmit={handleSubmit}>
                        <div className='form-group row'>
                          <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formTrnType'>
                            {t('transactionType')}
                          </label>
                          <div className='col-sm-8'>
                            <div className='form-control' style={{ margin: '0', overflow: 'hidden', backgroundColor: '#eaecf4', opacity: '1', boxSizing: 'border-box' }}>
                              {t(currTransactionType)}
                            </div>
                          </div>
                        </div>

                        <div className='form-group row'>
                          <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formLoanerId'>
                            {t('loanerId')}
                          </label>
                          <div className='col-sm-8'>
                            <div className='form-control' style={{ margin: '0', overflow: 'hidden', backgroundColor: '#eaecf4', opacity: '1', boxSizing: 'border-box' }}>
                              {loanerId}
                            </div>
                          </div>
                        </div>

                        <div className='form-group row'>
                          <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formLoanerName'>
                            {t('loanerName')}
                          </label>
                          <div className='col-sm-8'>
                            <div className='form-control' style={{ margin: '0', overflow: 'hidden', backgroundColor: '#eaecf4', opacity: '1', boxSizing: 'border-box' }}>
                              {loanerData['fullNameWithSalutation']}
                            </div>
                          </div>
                        </div>

                        <div className='form-group row'>
                          <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formOutstandingBooks'>
                            {t('outstandingBooks')}
                          </label>
                          <div className='col-sm-8'>
                            <div className='form-control' style={{ margin: '0', overflow: 'hidden', backgroundColor: '#eaecf4', opacity: '1', boxSizing: 'border-box' }}>
                              {loanerData['totalOutstanding']}
                            </div>
                          </div>
                        </div>

                        <div className='form-group row'>
                          <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formDueDate'>
                            {t('newDueDate')}
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
                                <div className='text-secondary pt-2 text-center'>{t('emptyCart')}</div>
                              ) : (
                                <div className='table-responsive'>
                                  <table className='table'>
                                    <thead className='table-light text-dark'>
                                      <tr>
                                        <th style={{ width: '55%' }}>{t('titlesInCart')}</th>
                                        <th>{t('qty')}</th>
                                        <th>{t('oldDueDate')}</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {cartBookCopies?.map((eachBook) => {
                                        const { book, copies, loanId, dueDate } = eachBook;

                                        return (
                                          <tr key={loanId}>
                                            <td className='pt-3' style={{ width: '60%' }}>
                                              {book['title']}
                                            </td>
                                            <td className='pt-3'>
                                              <div className='btn-group btn-group-sm' role='group'>
                                                <span className='btn disabled text-dark border-top border-bottom border-left' style={{ boxSizing: 'content-box', minWidth: '1.5em' }}>
                                                  {copies}
                                                </span>
                                                <button type='button' className='btn btn-secondary btn-circle' style={{ fontSize: '1.3em' }} value={loanId} onClick={(e) => handleRemove(e)}>
                                                  &#x292B;
                                                </button>
                                              </div>
                                            </td>
                                            <td className='pt-3'>{displayDate(dueDate)}</td>
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
                          {t('completeTransaction')}
                        </button>
                        <button
                          type='button'
                          className='btn btn-outline-danger mx-4 my-2'
                          onClick={() => {
                            let path = `/home`;
                            navigate(path);
                          }}
                        >
                          {t('cancel')}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className='col-lg-5'>
                  <div className='card shadow mb-4'>
                    <div className='card-body'>
                      {currentLoans.length === 0 ? (
                        <div className='text-secondary pt-2 text-center'>{t('noLoans')}</div>
                      ) : (
                        <div className='table-responsive'>
                          <table className='table table-bordered table-hover' id='dataTable' width='100%' cellSpacing='0' style={{ tableLayout: 'fixed' }}>
                            <thead className='table-secondary text-dark'>
                              <tr className='o-hidden'>
                                <th style={{ width: '70%' }}>{t('title')}</th>
                                <th>{t('qty')}</th>
                                <th>{t('add')}</th>
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

export default ExtendCart;
