import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ModalLogout from '../../components/ModalLogout';
import ScrollTop from '../../components/ScrollTop';
import Sidebar from '../../components/Sidebar';
import ViewLibrarianDetailsCard from '../../components/ViewLibrarianDetailsCard';
import { deleteCall } from '../../helpers/deleteCall';
import { useFetch } from '../../helpers/useFetch';

const ViewLibrarian = () => {
  const { id } = useParams();

  let librarianDetailUrl = `/api/librarian/${id}`;
  const { data: librarianData } = useFetch(librarianDetailUrl);

  let navigate = useNavigate();

  function handleDelete() {
    let librarianDeleteUrl = `${librarianDetailUrl}?deleteBy=${window.localStorage.getItem('id')}`;

    deleteCall(librarianDeleteUrl).then((result) => {
      window.alert(result['data']['message']);

      if (result['status'] === 200) {
        navigate(`/dashboard/librarian/search`);
      }
    });
  }

  function handleEdit() {
    navigate(`/dashboard/librarian/${id}/edit`);
  }

  function handlePasswordChange() {
    navigate(`/dashboard/librarian/${id}/change-password`);
  }

  useEffect(() => {
    if (id.toString() === window.localStorage.getItem('id')) {
      document.getElementById('deleteButton').style.display = 'none';
    }
  }, [id]);

  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading={librarianData['fullName']} />

            <div className='container-fluid'>
              <div className='row'>
                <ViewLibrarianDetailsCard data={librarianData} />

                <div className='col-lg-4 px-4 p-2'>
                  <div className='row'>
                    <div className='col-lg-12 px-4 p-2'>
                      <div className='btn-group btn-block'>
                        <button type='button' className='btn btn-secondary' onClick={handleEdit}>
                          Edit details
                        </button>
                        <button type='button' className='btn btn-info' onClick={handlePasswordChange}>
                          Change password
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='row' id='deleteButton'>
                    <div className='col-lg-12 px-4 p-2'>
                      <button type='button' className='btn btn-danger btn-block' onClick={handleDelete}>
                        Delete Librarian
                      </button>
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

export default ViewLibrarian;
