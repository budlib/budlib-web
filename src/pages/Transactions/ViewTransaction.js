import React from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ModalLogout from '../../components/ModalLogout';
import ScrollTop from '../../components/ScrollTop';
import Sidebar from '../../components/Sidebar';
import ViewTransactionDetailsCard from '../../components/ViewTransactionDetailsCard';
import { useFetch } from '../../helpers/useFetch';

const ViewTransaction = () => {
  const { id } = useParams();

  let transactionDetailsUrl = `/api/transactions/${id}`;
  const { data: trnData } = useFetch(transactionDetailsUrl);

  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading={'Transaction ID: '.concat(trnData['transactionId'] || '<not found>')} />

            <div className='container-fluid'>
              <div className='row'>
                <ViewTransactionDetailsCard data={trnData} />
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

export default ViewTransaction;
