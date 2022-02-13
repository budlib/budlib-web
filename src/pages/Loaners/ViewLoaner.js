import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../../helpers/useFetch';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollTop from '../../components/ScrollTop';
import ViewLoanerDetailsCard from '../../components/ViewLoanerDetailsCard';
import ViewCurrentLoansCard from '../../components/ViewCurrentLoansCard';
import ViewLoanerHistoryCard from '../../components/ViewLoanerHistoryCard';

const ViewLoaner = () => {
  const { id } = useParams();

  let loanerDetailUrl = `/api/loaners/${id}`;
  const { data: loanerData } = useFetch(loanerDetailUrl);

  let loanerLoansUrl = `/api/loaners/${id}/loans`;
  const { data: loanData } = useFetch(loanerLoansUrl);

  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading={loanerData['fullNameWithSalutation']} />

            <div className='container-fluid'>
              <div className='row'>
                <ViewLoanerDetailsCard data={loanerData} />

                <div className='col-sm-4 px-4 p-2'>
                  <div className='btn-group'>
                    <button type='button' className='btn btn-secondary'>
                      Edit details
                    </button>
                    <button type='button' className='btn btn-danger'>
                      Delete loaner
                    </button>
                  </div>
                </div>
              </div>

              <div className='row'>
                <ViewCurrentLoansCard data={loanData} />
              </div>
              <div className='row'>
                <ViewLoanerHistoryCard />
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>

      <ScrollTop />
    </React.Fragment>
  );
};

export default ViewLoaner;
