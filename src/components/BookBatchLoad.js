import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as xlsx from 'xlsx';
import { downloadCall } from '../helpers/downloadCall';
import { postCall } from '../helpers/postCall';
import { useTranslation, Trans } from 'react-i18next';

const BookBatchLoad = () => {
  const { t } = useTranslation('dashboard');
  // const [file, setFile] = useState();
  const [json, setJson] = useState([]);
  const [header, setHeader] = useState([]);
  const [headerMap, setHMap] = useState({});

  let navigate = useNavigate();

  useEffect(() => {
    const formInput = document.getElementById('formUploadFile');

    if (formInput.files === null || formInput.files.length === 0) {
      document.getElementById('formUploadButton').disabled = true;
      document.getElementById('formUploadButton').removeAttribute('onclick');
    } else {
      document.getElementById('formUploadButton').disabled = false;
      document.getElementById('formUploadButton').onclick = handleSubmit;
    }
  });

  const readUploadFile = (e) => {
    try {
      e.preventDefault();

      if (e.target.files) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = xlsx.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          setJson(xlsx.utils.sheet_to_json(worksheet));
          const columnsArray = Object.keys(xlsx.utils.sheet_to_json(worksheet)[0]);
          setHeader(columnsArray);
        };

        reader.readAsArrayBuffer(e.target.files[0]);
      }
    } catch (exception) {
      window.alert(t('cannotReadFile'));
    }
  };

  const handleSubmit = (e) => {
    let tempJson = [];
    let jObj = {};

    for (let i = 0; i < json.length; i++) {
      jObj = {};
      Object.keys(headerMap).forEach(function (key) {
        jObj[headerMap[key]] = json[i][key];
      });
      tempJson.push(jObj);
    }

    postCall('/api/books/import', tempJson).then((result) => {
      const status = result['status'];
      window.alert(t(
        [`booksRes.${status}`, 'booksRes.unspecific'],
        {responseMessage: result['data']['message']}
      ));

      if (status === 200) {
        let path = `/books/search`;
        navigate(path);
      }
    });
  };

  const importBookSample = () => {
    downloadCall('/api/dashboard/batch/samplebooks', 'sample_books_import.csv');
  };

  return (
    <React.Fragment>
      <div className='card shadow mb-4 text-dark p-2' style={{ maxWidth: '60rem' }}>
        <div className='card-body'>
          <form id='bookImport'>
            <div className='form-group row'>
              <div className='form-group col-lg-12'>
                <input
                  className='form-control'
                  type='file'
                  accept='.csv,.xls,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'
                  id='formUploadFile'
                  // value={file}
                  onChange={readUploadFile}
                />
              </div>
            </div>
          </form>
          <div>
            <Trans i18nKey='bookImportNote' ns='dashboard'>
              <strong>Note</strong>: The recommended file format during import is CSV. Please make sure that the file is in the correct format. A sample file can be downloaded from 
              <button
                onClick={() => {
                  importBookSample();
                  return false;
                }}
                style={{
                  background: 'none!important',
                  backgroundColor: '#fff',
                  border: 'none',
                  padding: '0!important',
                  color: '#069',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                this link.
              </button>
              The mandatory fields are <b>title</b>, <b>isbn_10</b> or <b>isbn_13</b>, <b>library_section</b>, <b>totalQuantity</b>, and <b>availableQuantity</b>.
            </Trans>
          </div>
        </div>
      </div>
      <div className='card shadow' style={{ maxWidth: '60rem' }}>
        <div className='card-body'>
          {header.length === 0 ? (
            <div className='text-secondary pt-2 text-center'>{t('noFile')}</div>
          ) : (
            <div className='table-responsive'>
              <table className='table table-bordered table-hover' id='dataTable' width='50%' cellSpacing='0'>
                <thead className='table-secondary text-dark'>
                  <tr>
                    <th>{t('headerInFile')}</th>
                    <th>{t('databaseCategory')}</th>
                  </tr>
                </thead>
                <tbody>
                  {header?.map((dataItem) => {
                    return (
                      <tr key={dataItem}>
                        <td>{dataItem}</td>
                        <td>
                          <div className='dropdown'>
                            <div className='col-sm-8'>
                              <select
                                className='form-control'
                                id='formDBHeader'
                                name='formDBHeader'
                                onChange={(e) => {
                                  let headers = e.target.value.split('@@');
                                  let tempMap = headerMap;

                                  if (headers[1] !== 'na') {
                                    tempMap[headers[0]] = headers[1];
                                  } else {
                                    if (tempMap.hasOwnProperty(headers[0])) {
                                      delete tempMap[headers[0]];
                                    }
                                  }

                                  setHMap(tempMap);
                                }}
                              >
                                <option value={dataItem + '@@' + 'na'}>{t('notUsed')}</option>
                                <option value={dataItem + '@@' + 'title'}>{t('title')}</option>
                                <option value={dataItem + '@@' + 'subtitle'}>{t('subtitle')}</option>
                                <option value={dataItem + '@@' + 'authors'}>{t('authors')}</option>
                                <option value={dataItem + '@@' + 'publisher'}>{t('publisher')}</option>
                                <option value={dataItem + '@@' + 'edition'}>{t('edition')}</option>
                                <option value={dataItem + '@@' + 'year'}>{t('year')}</option>
                                <option value={dataItem + '@@' + 'language'}>{t('language')}</option>
                                <option value={dataItem + '@@' + 'isbn_10'}>{t('isbn_10')}</option>
                                <option value={dataItem + '@@' + 'isbn_13'}>{t('isbn_13')}</option>
                                <option value={dataItem + '@@' + 'librarySection'}>{t('librarySection')}</option>
                                <option value={dataItem + '@@' + 'totalQuantity'}>{t('totalQuantity')}</option>
                                <option value={dataItem + '@@' + 'availableQuantity'}>{t('availableQuantity')}</option>
                                <option value={dataItem + '@@' + 'imageLink'}>{t('imageLink')}</option>
                                <option value={dataItem + '@@' + 'notes'}>{t('notes')}</option>
                                <option value={dataItem + '@@' + 'priceRetail'}>{t('priceRetail')}</option>
                                <option value={dataItem + '@@' + 'priceLibrary'}>{t('priceLibrary')}</option>
                              </select>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <div className='pt-3 mb-4'>
        <button type='button' className='btn btn-primary' id='formUploadButton' disabled>
          {t('upload')}
        </button>
        <button
          type='button'
          className='btn btn-outline-danger mx-4 my-2'
          onClick={() => {
            let path = `/dashboard`;
            navigate(path);
          }}
        >
          {t('cancel')}
        </button>
      </div>
    </React.Fragment>
  );
};
export default BookBatchLoad;
