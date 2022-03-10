import React from 'react';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollTop from '../components/ScrollTop';
import { useFetch } from '../helpers/useFetch';
import Menu from '../components/Menu';
import DashboardMenu from '../components/DashboardMenu';

const Dashboard = () => {
  const statsUrl = '/api/dashboard/stats';
  const { data: statsData } = useFetch(statsUrl);

  let ratioOutstanding = statsData['totalOutstandingCopies'] / statsData['totalCopies'];
  let percentageOutstanding = ratioOutstanding.toFixed(2) * 100;
  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading='Dashboard' />
            <div className='container-fluid'>
            <div className='row'>
                <div className='col-xl-3 col-md-6 mb-4'>
                  <div className='card border-left-primary shadow h-100 py-2'>
                    <div className='card-body'>
                      <div className='row no-gutters align-items-center'>
                        <div className='col mr-2'>
                          <div className='text-xs font-weight-bold text-primary text-uppercase mb-1'>Unique titles</div>
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
                          <div className='text-xs font-weight-bold text-warning text-uppercase mb-1'>Total loaners</div>
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
                          <div className='text-xs font-weight-bold text-success text-uppercase mb-1'>Total copies of all titles</div>
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
                          <div className='text-xs font-weight-bold text-info text-uppercase mb-1'>Total outstanding copies</div>
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

              <DashboardMenu />

            </div>
          </div>

          <Footer />
        </div>
      </div>

      <ScrollTop />
    </React.Fragment>
  );
};

export default Dashboard;
