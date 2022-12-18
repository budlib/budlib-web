import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ModalLogout from '../../components/ModalLogout';
import ScrollTop from '../../components/ScrollTop';
import Sidebar from '../../components/Sidebar';
import ViewBookDetailsCard from '../../components/ViewBookDetailsCard';
import ViewBookLoansCard from '../../components/ViewBookLoansCard';
import { deleteCall } from '../../helpers/deleteCall';
import { useFetch } from '../../helpers/useFetch';
import { useTranslation } from 'react-i18next';

const ViewBook = () => {
  const { t } = useTranslation('view-book');
  const { id } = useParams();

  let bookDetailUrl = `/api/books/${id}`;
  const { data: bookData } = useFetch(bookDetailUrl);

  let bookLoansUrl = `/api/books/${id}/loans`;
  const { data: bookLoanData } = useFetch(bookLoansUrl);

  let navigate = useNavigate();

  function handleDelete(e) {
    deleteCall(bookDetailUrl).then((result) => {
      const status = result['status'];
      window.alert(t(
        [`deleteResp.${status}`, 'deleteResp.unspecific'],
        {errorMessage: result['data']['message']}
      ));

      if (status === 200) {
        let path = `/books/search`;
        navigate(path);
      }
    });
  }

  function handleEdit(e) {
    let path = `/books/${id}/edit`;
    navigate(path);
  }

  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading={bookData['title']} />

            <div className='container-fluid'>
              <div className='row'>
                <ViewBookDetailsCard data={bookData} />

                {window.localStorage.getItem('role') === 'ADMIN' ? (
                  <div className='col-sm-4 px-4 p-2'>
                    <div className='btn-group btn-block'>
                      <button type='button' className='btn btn-secondary' onClick={handleEdit}>
                        {t('edit')}
                      </button>
                      <button type='button' className='btn btn-danger' onClick={handleDelete}>
                        {t('delete')}
                      </button>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>

              {window.localStorage.getItem('role') === 'ADMIN' ? (
                <div className='row'>
                  <ViewBookLoansCard data={bookLoanData} />
                </div>
              ) : (
                ''
              )}
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

export default ViewBook;
