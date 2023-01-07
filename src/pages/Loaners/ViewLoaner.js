import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ModalLogout from '../../components/ModalLogout';
import ScrollTop from '../../components/ScrollTop';
import Sidebar from '../../components/Sidebar';
import ViewCurrentLoansCard from '../../components/ViewCurrentLoansCard';
import ViewLoanerDetailsCard from '../../components/ViewLoanerDetailsCard';
import ViewLoanerHistoryCard from '../../components/ViewLoanerHistoryCard';
import { deleteCall } from '../../helpers/deleteCall';
import { useFetch } from '../../helpers/useFetch';
import { useTranslation } from 'react-i18next';

const ViewLoaner = () => {
  const { t } = useTranslation('loaners');
  const { id } = useParams();

  let loanerDetailUrl = `/api/loaners/${id}`;
  const { data: loanerData } = useFetch(loanerDetailUrl);

  let loanerLoansUrl = `/api/loaners/${id}/loans`;
  const { data: loanData } = useFetch(loanerLoansUrl);

  let navigate = useNavigate();

  function handleDelete(e) {
    deleteCall(loanerDetailUrl).then((result) => {
      const status = result['status'];
      window.alert(t(
        [`deleteResp.${status}`, 'deleteResp.unspecific'],
        {errorMessage: result['data']['message']}
      ));

      if (status === 200) {
        let path = `/loaners/search`;
        navigate(path);
      }
    });
  }

  function handleEdit(e) {
    let path = `/loaners/${id}/edit`;
    navigate(path);
  }

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
                  <div className='btn-group btn-block'>
                    <button type='button' className='btn btn-secondary' onClick={handleEdit}>
                      {t('editDetails')}
                    </button>
                    <button type='button' className='btn btn-danger' onClick={handleDelete}>
                      {t('deleteLoaner')}
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
      <ModalLogout />
    </React.Fragment>
  );
};

export default ViewLoaner;
