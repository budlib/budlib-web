import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../../helpers/useFetch';
import { deleteCall } from '../../helpers/deleteCall';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollTop from '../../components/ScrollTop';
import ViewBookDetailsCard from '../../components/ViewBookDetailsCard';
import ViewBookLoansCard from '../../components/ViewBookLoansCard';

const ViewBook = () => {
  const { id } = useParams();

  let bookDetailUrl = `/api/books/${id}`;
  const { data: bookData } = useFetch(bookDetailUrl);

  let bookLoansUrl = `/api/books/${id}/loans`;
  const { data: bookLoanData } = useFetch(bookLoansUrl);

  let navigate = useNavigate();

  function handleDelete(e) {
    deleteCall(bookDetailUrl).then((result) => {
      window.alert(result['data']['message']);

      if (result['status'] === 200) {
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

                <div className='col-sm-4 px-4 p-2'>
                  <div className='btn-group btn-block'>
                    <button type='button' className='btn btn-secondary' onClick={handleEdit}>
                      Edit details
                    </button>
                    <button type='button' className='btn btn-danger' onClick={handleDelete}>
                      Delete Book
                    </button>
                  </div>
                </div>
              </div>

              <div className='row'>
                <ViewBookLoansCard data={bookLoanData} />
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

export default ViewBook;
