import React from 'react';
import { useState } from 'react';

function BookSearchBar(props) {
  const [filterOption, setfilterOption] = useState('');
  const [filterText, setfilterText] = useState('');

  const handleFilter = (e) => {
    setfilterOption(e.target.value);
  };

  const handleFilterText = (e) => {
    setfilterText(e.target.value);
  };

  const handleSearch = (e) => {
    if (filterOption != '') {
      props.func([filterOption, filterText]);
    } else {
      window.alert('Searching requires a filter');
    }
  };

  return (
    filterOption,
    filterText,
    (
      <div className='row'>
        <div className='col-lg-12'>
          <div className='card shadow'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-lg-4'>
                  <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text' htmlFor='inputGroupSelect01'>
                        Search by
                      </span>
                    </div>
                    <select className='form-control form-select' id='selectFilter' onChange={(e) => handleFilter(e)} value={filterOption}>
                      <option value=''>No Filter</option>
                      <option value='title'>Title</option>
                      <option value='author'>Author</option>
                      <option value='publisher'>Publisher</option>
                      <option value='isbn'>ISBN</option>
                      <option value='tags'>Tags</option>
                      <option value='librarysection'>Library Section</option>
                      <option value='language'>Language</option>
                    </select>
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>Search term</span>
                    </div>
                    <input type='text' id='inputFilter' onChange={(e) => handleFilterText(e)} value={filterText} className='form-control' placeholder='Your search term goes here' />
                  </div>
                </div>

                <div className='col-lg-2'>
                  <button type='button' className='btn btn-primary btn-block' onClick={(e) => handleSearch(e)}>
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
export default BookSearchBar;
