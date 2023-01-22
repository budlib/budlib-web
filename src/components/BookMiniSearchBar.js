import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function BookSearchBar(props) {
  const { t } = useTranslation('books');
  const [filterOption, setfilterOption] = useState('');
  const [filterText, setfilterText] = useState('');

  const handleFilter = (e) => {
    setfilterOption(e.target.value);
  };

  const handleFilterText = (e) => {
    setfilterText(e.target.value);
  };

  const handleSearch = (e) => {
    if (filterOption !== '') {
      props.func([filterOption, filterText]);
    } else {
      window.alert(t('missingFilter'));
    }
  };

  const triggerSearchOnEnter = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='card shadow mb-4'>
      <div className='card-body'>
        <div className='row'>
          <div className='col-lg-8'>
            <div className='input-group mb-3'>
              <div className='input-group-prepend'>
                <span className='input-group-text' htmlFor='inputGroupSelect01'>
                  {t('searchBy')}
                </span>
              </div>
              <select className='form-control form-select' id='selectFilter' onChange={(e) => handleFilter(e)} value={filterOption}>
                <option value=''>{t('noFilter')}</option>
                <option value='librarysection'>{t('librarySection')}</option>
                <option value='title'>{t('title')}</option>
                <option value='author'>{t('author')}</option>
                <option value='publisher'>{t('publisher')}</option>
                <option value='isbn'>{t('isbn')}</option>
                <option value='tags'>{t('tags')}</option>
                <option value='language'>{t('language')}</option>
              </select>
            </div>
          </div>

          <div className='col-lg-4'>
            <button type='button' className='btn btn-primary btn-block' onClick={(e) => handleSearch(e)}>
              {t('search')}
            </button>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-12'>
            <div className='input-group mb-3'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>{t('searchTerm')}</span>
              </div>
              <input
                type='text'
                id='inputFilter'
                onChange={(e) => handleFilterText(e)}
                value={filterText}
                className='form-control'
                placeholder={t('searchTermPlaceholder')}
                onKeyDown={(e) => triggerSearchOnEnter(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BookSearchBar;
