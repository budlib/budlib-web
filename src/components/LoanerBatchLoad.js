import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from './../helpers/useFetch';
import { deleteCall } from './../helpers/deleteCall';
import * as xlsx from "xlsx";
import isWindows from 'cross-env/src/is-windows';
import { postCall } from '../helpers/postCall';

const LoanerBatchLoad = () => {
    const [file, setFile] = useState();
    const [json, setJson] = useState([]);
    const [header, setHeader] = useState([]);
    const [headerMap, setHMap] = useState({});
    let navigate = useNavigate();

    const readUploadFile = (e) => {
        try {
        e.preventDefault();

        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                setJson( xlsx.utils.sheet_to_json(worksheet));
                const columnsArray = Object.keys(xlsx.utils.sheet_to_json(worksheet)[0]);
                setHeader(columnsArray);
                //console.log(json);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }

        } catch (exception) {
            window.alert("There are problems with the upload file");
            }
    }

    const handleSubmit =(e)=>{
      let tempJson = [];
      let jObj = {};

      for (let i = 0; i < json.length; i++) {
        jObj = {};
        Object.keys(headerMap).forEach(function(key) {

          jObj[headerMap[key]] = json[i][key];

        })

        tempJson.push(jObj);

      }


      console.log(tempJson);

            postCall('/api/loaners/multiple', tempJson).then((result) => {
              window.alert(result['data']['message']);
              if (result['status'] === 200) {
                let path = `/loaners/search`;
                navigate(path);
              }



            });



    }


    return (
        <React.Fragment>
        <div>
            <input
            type="file"
            id="file"
            value={file}
            onChange={readUploadFile}


            />
            <button onClick={(e) => handleSubmit(e)}


            >
            Upload File
            </button>
        </div>

          <div className='card-body'>
            <div className='table-responsive'>
              <table className='table table-bordered table-hover' id='dataTable' width='50%' cellSpacing='0'>
                <thead className='table-secondary text-dark'>
                  <tr>
                  <th>Header in Source</th>
                    <th>Database Category</th>


                  </tr>
                </thead>
                <tfoot>
                  <tr>
                  <th>Header in Source</th>
                    <th>Database Category</th>

                  </tr>
                </tfoot>
                <tbody>
                  {header.map((dataItem) => {




                    return (
                      <tr key={dataItem}>
                        <td>

                            {dataItem}

                        </td>
                        <td>
                        <div className="dropdown">
                        <div className='col-sm-8'>
                          <select
                            className='form-control'
                            id='formLoanerType'
                            name='formLoanerType'
                            //value={dataItem+"@"+"na"}
                            onChange={(e) => {

                              let headers = e.target.value.split("@");

                              let tempMap = headerMap;
                              if(headers[1] !='na'){

                                tempMap[headers[0]] = headers[1];

                              }else{
                                if(tempMap.hasOwnProperty(headers[0])){
                                  delete tempMap[headers[0]];

                                }


                              }

                              setHMap(tempMap);





                            }}
                          >
                            <option value={dataItem+"@"+'na'}>not_use</option>
                            <option value={dataItem+"@"+'schoolId'}>schoolId</option>
                            <option value={dataItem+"@"+'email'}>email</option>
                            <option value={dataItem+"@"+'salutation'}>salutation</option>
                            <option value={dataItem+"@"+'firstName'}>firstName</option>
                            <option value={dataItem+"@"+'middleName'}>middleName</option>
                            <option value={dataItem+"@"+'lastName'}>lastName</option>
                            <option value={dataItem+"@"+'motherName'}>motherName</option>
                            <option value={dataItem+"@"+'fatherName'}>fatherName</option>
                            <option value={dataItem+"@"+'isStudent'}>isStudent</option>

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




          </div>






        </React.Fragment>





    );




};
export default LoanerBatchLoad;
