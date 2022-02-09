import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../../helpers/useFetch';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollTop from '../../components/ScrollTop';

const ViewLoaner = () => {
  const { id } = useParams();

  let url = `http://localhost:8080/api/loaners/${id}`;
  const { loading, data } = useFetch(url);

  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading={data['fullName']} />
            {console.log(data['fullName'])}

            <div className='container-fluid'>
              {/* displaying individual loaner */}
              <div className='row'>
                <div className='col-lg-8'>
                  <div className='card shadow mb-4'>
                    <a href='#descriptionCard' className='d-block card-header py-3' data-toggle='collapse' role='button' aria-expanded='true' aria-controls='descriptionCard'>
                      <h6 className='m-0 font-weight-bold text-primary'>Details</h6>
                    </a>

                    <div className='collapse show' id='descriptionCard'>
                      <div className='card-body'>
                        <p>
                          <strong>Loaner Id</strong>: {data['loanerId']}
                        </p>
                        <p>
                          <strong>Loaner Type</strong>: {data['student'] ? 'Student' : 'Faculty'}
                        </p>
                        <p>
                          <strong>School Id</strong>: {data['schoolId']}
                        </p>

                        {data['student'] ? (
                          ''
                        ) : (
                          <p>
                            <strong>Salutation</strong>: {data['salutation']}
                          </p>
                        )}

                        <p>
                          <strong>First Name</strong>: {data['firstName']}
                        </p>
                        <p>
                          <strong>Middle Name</strong>: {data['middleName'] || 'not given'}
                        </p>
                        <p>
                          <strong>Last Name</strong>: {data['lastName']}
                        </p>
                        <p>
                          <strong>Borrowed books</strong>: "fetch"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-lg-4 px-4 p-2'>
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
                <div className='col-lg-8'>
                  <div className='card shadow mb-4'>
                    <a href='#loansCard' className='d-block card-header py-3' data-toggle='collapse' role='button' aria-expanded='true' aria-controls='loansCard'>
                      <h6 className='m-0 font-weight-bold text-primary'>Loans</h6>
                    </a>

                    <div className='collapse show' id='loansCard'>
                      <div className='card-body'>
                        <p>
                          <strong>Book name</strong>: 'Get from API'
                        </p>
                        <p>
                          <strong>Copies</strong>: 'Get from API'
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* form test */}
              {/* <form>
                <div className='form-group row'>
                  <label for='text' className='col-4 col-form-label'>
                    Text Field
                  </label>
                  <div className='col-8'>
                    <div className='input-group'>
                      <div className='input-group-prepend'>
                        <div className='input-group-text'>
                          <i className='fa fa-address-card'></i>
                        </div>
                      </div>
                      <input id='text' name='text' type='text' className='form-control' />
                    </div>
                  </div>
                </div>
                <div className='form-group row'>
                  <label for='select' className='col-4 col-form-label'>
                    Select
                  </label>
                  <div className='col-8'>
                    <select id='select' name='select' className='custom-select'>
                      <option value='rabbit'>Rabbit</option>
                      <option value='duck'>Duck</option>
                      <option value='fish'>Fish</option>
                    </select>
                  </div>
                </div>
                <div className='form-group row'>
                  <div className='offset-4 col-8'>
                    <button name='submit' type='submit' className='btn btn-primary'>
                      Submit
                    </button>
                  </div>
                </div>
              </form> */}
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
