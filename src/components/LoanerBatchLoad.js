import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as xlsx from 'xlsx';
import { postCall } from '../helpers/postCall';
import { downloadCall } from '../helpers/downloadCall';

const LoanerBatchLoad = () => {
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
  }, [document.getElementById('formUploadFile')]);

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
      window.alert('Uploaded file cannot be read');
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

    postCall('/api/loaners/import', tempJson).then((result) => {
      window.alert(result['data']['message']);

      if (result['status'] === 200) {
        let path = `/loaners/search`;
        navigate(path);
      }
    });
  };

  const importLoanerSample = () => {
    downloadCall('/api/dashboard/batch/sampleloaners', 'sample_loaners_import.csv');
  };

  return (
    <React.Fragment>
      <div className='card shadow mb-4 text-dark p-3' style={{ maxWidth: '60rem' }}>
        <div className='card-body'>
          <form id='loanerImport'>
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
            <strong>Note</strong>: The recommended file format during import is CSV. Please make sure that the file is in the correct format. A sample file can be downloaded from{' '}
            <button
              onClick={() => {
                importLoanerSample();
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
            The mandatory fields are <b>isStudent</b> and <b>firstName</b>.
          </div>
        </div>
      </div>

      <div className='card shadow' style={{ maxWidth: '60rem' }}>
        <div className='card-body'>
          {header.length === 0 ? (
            <div className='text-secondary pt-2 text-center'>No file uploaded</div>
          ) : (
            <div className='table-responsive'>
              <table className='table table-bordered table-hover' id='dataTable' width='50%' cellSpacing='0'>
                <thead className='table-secondary text-dark'>
                  <tr>
                    <th>Header in File</th>
                    <th>Database Category</th>
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
                                id='formLoanerType'
                                name='formLoanerType'
                                //value={dataItem+"@"+"na"}
                                onChange={(e) => {
                                  let headers = e.target.value.split('@');

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
                                <option value={dataItem + '@' + 'na'}>not_use</option>
                                <option value={dataItem + '@' + 'schoolId'}>schoolId</option>
                                <option value={dataItem + '@' + 'email'}>email</option>
                                <option value={dataItem + '@' + 'isStudent'}>isStudent</option>
                                <option value={dataItem + '@' + 'salutation'}>salutation</option>
                                <option value={dataItem + '@' + 'firstName'}>firstName</option>
                                <option value={dataItem + '@' + 'middleName'}>middleName</option>
                                <option value={dataItem + '@' + 'lastName'}>lastName</option>
                                <option value={dataItem + '@' + 'motherName'}>motherName</option>
                                <option value={dataItem + '@' + 'fatherName'}>fatherName</option>
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
          Upload File
        </button>
        <button
          type='button'
          className='btn btn-outline-danger mx-4 my-2'
          onClick={() => {
            let path = `/dashboard`;
            navigate(path);
          }}
        >
          Cancel
        </button>
      </div>
    </React.Fragment>
  );
};
export default LoanerBatchLoad;
