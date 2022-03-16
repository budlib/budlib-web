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
                //console.log(json);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }

        } catch (exception) {
            window.alert("There are problems with the upload file");
            }
    }

    const handleSubmit =(e)=>{
        let tempJson = json;

            setJson(tempJson);
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
                    <th>Student ID</th>
                    <th>Email</th>
                    <th>Name</th>


                  </tr>
                </thead>
                <tfoot>
                  <tr>
                  <th>Student ID</th>
                  <th>Email</th>
                    <th>Name</th>

                  </tr>
                </tfoot>
                <tbody>
                  {json.map((dataItem) => {
                    let { schoolId, email, firstName, middleName, lastName } = dataItem;



                    return (
                      <tr key={schoolId}>
                        <td>

                            {schoolId}

                        </td>
                        <td>{email}</td>
                        <td>{firstName} {middleName} {lastName}</td>

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
