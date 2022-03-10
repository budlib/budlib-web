import React from 'react';
import { useFetch } from '../helpers/useFetch';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { postCall } from '../helpers/postCall';
import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';
const urlBook = '/api/books';


function DataExportBook() {
    const {data} = useFetch('/api/books');

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const fileExtension = '.xlsx';


    const handleBooks =(e)=>{
      console.log("Got into handle");
        console.log(data);
        const ws = XLSX.utils.json_to_sheet(data);

        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

        const datax = new Blob([excelBuffer], {type: fileType});

        FileSaver.saveAs(datax, 'book-report' + fileExtension);

      }




  return (
    <div className='row pt-3'>
      <div className='col-xl-3 col-lg-5'>
      <button onClick={(e) => handleBooks(e)}  style={{ textDecoration: 'none' }}>
        <div className='card shadow mb-4'>
          <div className='card-header py-3'>
            <h6 className='m-0 font-weight-bold text-primary'>Export Books</h6>
          </div>

          <div className='card-body p-0'>
            <div
              className='pt-0 pb-0'
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + '/images/menu_borrow_books.svg'})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              <div className='pt-0' style={{ height: '250px', width: '250px' }}></div>
            </div>
          </div>
        </div>
      </button>



    </div>
    </div>
  );
}

export default DataExportBook;
