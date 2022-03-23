import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../helpers/useFetch';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollTop from '../../components/ScrollTop';
import ModalLogout from '../../components/ModalLogout';
import ViewTransactionDetailsCard from '../../components/ViewTransactionDetailsCard';

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
