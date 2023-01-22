import React from 'react';
import { Link } from 'react-router-dom';
import BatchExport from '../components/BatchExport';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ModalLogout from '../components/ModalLogout';
import ScrollTop from '../components/ScrollTop';
import Sidebar from '../components/Sidebar';
import { useFetch } from '../helpers/useFetch';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation('dashboard');
  const statsUrl = '/api/dashboard/stats';
  const { data: statsData } = useFetch(statsUrl);

  const overdueUrl = '/api/dashboard/overdue';
  const { data: overdueData } = useFetch(overdueUrl);

  const upcomingdueUrl = '/api/dashboard/upcomingdue';
  const { data: upcomingdueData } = useFetch(upcomingdueUrl);

  let ratioOutstanding = statsData['totalOutstandingCopies'] / statsData['totalCopies'];
  let percentageOutstanding = (ratioOutstanding * 100).toFixed(2);

  if (statsData['totalCopies'] === 0) {
    percentageOutstanding = 0.0;
  }

  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading={t('dashboard')} />
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-xl-3 col-md-6 mb-4'>
                  <div className='card border-left-primary shadow h-100 py-2'>
                    <div className='card-body'>
                      <div className='row no-gutters align-items-center'>
                        <div className='col mr-2'>
                          <div className='text-xs font-weight-bold text-primary text-uppercase mb-1'>{t('uniqueTitles')}</div>
                          <div className='h5 mb-0 font-weight-bold text-gray-800'>{statsData['uniqueTitles']}</div>
                        </div>
                        <div className='col-auto'>
                          <i className='fas fa-book fa-2x text-gray-300'></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-xl-3 col-md-6 mb-4'>
                  <div className='card border-left-warning shadow h-100 py-2'>
                    <div className='card-body'>
                      <div className='row no-gutters align-items-center'>
                        <div className='col mr-2'>
                          <div className='text-xs font-weight-bold text-warning text-uppercase mb-1'>{t('totalLoaners')}</div>
                          <div className='h5 mb-0 font-weight-bold text-gray-800'>{statsData['totalLoaners']}</div>
                        </div>
                        <div className='col-auto'>
                          <i className='fas fa-id-badge fa-2x text-gray-300'></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-xl-3 col-md-6 mb-4'>
                  <div className='card border-left-success shadow h-100 py-2'>
                    <div className='card-body'>
                      <div className='row no-gutters align-items-center'>
                        <div className='col mr-2'>
                          <div className='text-xs font-weight-bold text-success text-uppercase mb-1'>{t('totalCopies')}</div>
                          <div className='h5 mb-0 font-weight-bold text-gray-800'>{statsData['totalCopies']}</div>
                        </div>
                        <div className='col-auto'>
                          <i className='fas fa-calculator fa-2x text-gray-300'></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-xl-3 col-md-6 mb-4'>
                  <div className='card border-left-info shadow h-100 py-2'>
                    <div className='card-body'>
                      <div className='row no-gutters align-items-center'>
                        <div className='col mr-2'>
                          <div className='text-xs font-weight-bold text-info text-uppercase mb-1'>{t('totalOutstanding')}</div>
                          <div className='row no-gutters align-items-center'>
                            <div className='col-auto'>
                              <div className='h5 mb-0 mr-3 font-weight-bold text-gray-800'>{percentageOutstanding + '%'}</div>
                            </div>
                            <div className='col'>
                              <div className='progress progress-sm mr-2'>
                                <div
                                  className='progress-bar bg-info'
                                  role='progressbar'
                                  style={{ width: `${percentageOutstanding}%` }}
                                  aria-valuenow={percentageOutstanding}
                                  aria-valuemin='0'
                                  aria-valuemax='100'
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-auto'>
                          <i className='fas fa-clipboard-list fa-2x text-gray-300'></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='row pt-4'>
                <div className='col-lg-6 mb-4'>
                  <div className='row'>
                    <BatchExport />
                  </div>
                </div>
                <div className='col-lg-6 mb-4'>
                  <div className='row'>
                    <div className='col-lg-12 mb-4'>
                      <div className='card bg-dark text-white shadow'>
                        <Link to='/dashboard/librarian/search' style={{ textDecoration: 'none' }}>
                          <div className='card-body'>
                            <h5 className='text-white'>{t('librarianManagement')}</h5>
                            <div className='text-white-50 small'>{t('librarianManagementDesc')}</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className='col-lg-6 mb-4'>
                      <div className='card bg-dark text-white shadow'>
                        <Link to='/dashboard/import/books' style={{ textDecoration: 'none' }}>
                          <div className='card-body'>
                            <h5 className='text-white'>{t('importBooks')}</h5>
                            <div className='text-white-50 small'>{t('importBooksDesc')}</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className='col-lg-6 mb-4'>
                      <div className='card bg-dark text-white shadow'>
                        <Link to='/dashboard/import/loaners' style={{ textDecoration: 'none' }}>
                          <div className='card-body'>
                            <h5 className='text-white'>{t('importLoaners')}</h5>
                            <div className='text-white-50 small'>{t('importLoanersDesc')}</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row pt-2'>
                <div className='col-lg-6 mb-4'>
                  <div className='card shadow mb-4'>
                    <div className='card-header py-3'>
                      <h6 className='m-0 font-weight-bold text-primary'>{t('overdueLoans')}</h6>
                    </div>
                    <div className='card-body'>
                      <div className='table-responsive'>
                        {overdueData.length === 0 ? (
                          t('noOverdueLoans')
                        ) : (
                          <table className='table table-bordered table-hover' cellSpacing='0' style={{ tableLayout: 'fixed' }}>
                            <thead className='table-secondary text-dark'>
                              <tr>
                                <th style={{ width: '25%' }}>{t('loaner')}</th>
                                <th style={{ width: '35%' }}>{t('book')}</th>
                                <th style={{ width: '15%' }}>{t('copies')}</th>
                                <th style={{ width: '25%' }}>{t('dueDate')}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {overdueData?.map((overDueItem) => {
                                const { loanId, loaner, book, copies, dueDate } = overDueItem;

                                return (
                                  <tr key={loanId}>
                                    <td>
                                      <Link
                                        to={`/loaners/${loaner['loanerId']}/view`}
                                        style={{
                                          display: 'block',
                                          width: '100%',
                                          color: 'inherit',
                                          textOverflow: 'ellipsis',
                                          overflow: 'hidden',
                                          whiteSpace: 'nowrap',
                                        }}
                                      >
                                        {loaner['fullName']}
                                      </Link>
                                    </td>
                                    <td
                                      style={{
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                      }}
                                    >
                                      {book['title']}
                                    </td>
                                    <td>{copies}</td>
                                    <td
                                      style={{
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                      }}
                                    >
                                      {dueDate}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-lg-6 mb-4'>
                  <div className='card shadow mb-4'>
                    <div className='card-header py-3'>
                      <h6 className='m-0 font-weight-bold text-primary'>{t('upcomingDueDates')}</h6>
                    </div>
                    <div className='card-body'>
                      <div className='table-responsive'>
                        {upcomingdueData.length === 0 ? (
                          t('noUpcomingDueDates')
                        ) : (
                          <table className='table table-bordered table-hover' cellSpacing='0' style={{ tableLayout: 'fixed' }}>
                            <thead className='table-secondary text-dark'>
                              <tr>
                                <th style={{ width: '25%' }}>{t('loaner')}</th>
                                <th style={{ width: '35%' }}>{t('book')}</th>
                                <th style={{ width: '15%' }}>{t('copies')}</th>
                                <th style={{ width: '25%' }}>{t('dueDate')}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {upcomingdueData?.map((upcomingDueItem) => {
                                const { loanId, loaner, book, copies, dueDate } = upcomingDueItem;

                                return (
                                  <tr key={loanId}>
                                    <td>
                                      <Link
                                        to={`/loaners/${loaner['loanerId']}/view`}
                                        style={{
                                          display: 'block',
                                          width: '100%',
                                          color: 'inherit',
                                          textOverflow: 'ellipsis',
                                          overflow: 'hidden',
                                          whiteSpace: 'nowrap',
                                        }}
                                      >
                                        {loaner['fullName']}
                                      </Link>
                                    </td>
                                    <td
                                      style={{
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                      }}
                                    >
                                      {book['title']}
                                    </td>
                                    <td>{copies}</td>
                                    <td
                                      style={{
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                      }}
                                    >
                                      {dueDate}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        )}
                      </div>
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

export default Dashboard;
