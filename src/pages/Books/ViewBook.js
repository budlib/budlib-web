import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../../helpers/useFetch';
import ViewBookDetailsCard from '../../components/ViewBookDetailsCard';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollTop from '../../components/ScrollTop';
let url = '/api/books';

const ViewBook = () => {
  const { id } = useParams();
  let thisurl = url+'/'+id;
  const { data: bookData } = useFetch(thisurl);

  let customImg = '';
  let defaultImg = customImg || `${process.env.PUBLIC_URL + '/images/no_image_book_v2.jpg'}`;

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
                  <div className='btn-group'>
                    <button type='button' className='btn btn-secondary'>
                      Edit details
                    </button>
                    <button type='button' className='btn btn-danger'>
                      Delete Book
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

export default ViewBook;
