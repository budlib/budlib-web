import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../../helpers/useFetch';
import { deleteCall } from '../../helpers/deleteCall';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollTop from '../../components/ScrollTop';
import ViewLoanerDetailsCard from '../../components/ViewLoanerDetailsCard';
import ViewCurrentLoansCard from '../../components/ViewCurrentLoansCard';
import ViewLoanerHistoryCard from '../../components/ViewLoanerHistoryCard';
import ViewLibrarianDetailsCard from '../../components/ViewLibrarianDetailsCard';

const ViewLibrarian = () => {
  const { id } = useParams();

  let librarianDetailUrl = `/api/librarian/${id}`;
  const { data: librarianData } = useFetch(librarianDetailUrl);



  let navigate = useNavigate();

  function handleDelete(e) {
    deleteCall(librarianDetailUrl).then((result) => {
      window.alert(result['data']['message']);

      if (result['status'] == 200) {
        let path = `/librarian/`;
        navigate(path);
      }
    });
  }

  function handleEdit(e) {
    let path = `/librarian/${id}/edit`;
    navigate(path);
  }

  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading={librarianData['userName']} />

            <div className='container-fluid'>
              <div className='row'>
                <ViewLibrarianDetailsCard data={librarianData} />

                <div className='col-sm-4 px-4 p-2'>
                  <div className='btn-group'>
                    <button type='button' className='btn btn-secondary' onClick={handleEdit}>
                      Edit details
                    </button>
                    <button type='button' className='btn btn-danger' onClick={handleDelete}>
                      Delete Librarian
                    </button>
                  </div>
                </div>
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

export default ViewLibrarian;
