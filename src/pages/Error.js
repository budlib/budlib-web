import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ModalLogout from '../components/ModalLogout.js';
import ScrollTop from '../components/ScrollTop';
import Sidebar from '../components/Sidebar';
import { useTranslation } from 'react-i18next';

const Error = () => {
  const { t } = useTranslation();
  let notFoundPic = '/images/not_found.svg';

  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading={t('pageNotFound')} />
            <div className='container-fluid'>
              <div className='text-center'>
                {/* <div class='error mx-auto' data-text='404'>
                  404
                </div> */}
                <div className='container container-fluid'>
                  <img className='img-fluid' src={process.env.PUBLIC_URL + notFoundPic} alt='404' style={{ maxHeight: '400px' }} />
                </div>
                {/* <p className='lead text-gray-800 mb-5'>Page not found</p> */}
                <Link to='/home' className='btn btn-info btn-icon-split m-5'>
                  <span className='icon text-white-50'>
                    <i className='fas fa-arrow-alt-circle-left'></i>
                  </span>
                  <span className='text'>{t('backToHome')}</span>
                </Link>
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

export default Error;
