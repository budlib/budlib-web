import React from 'react';
import { useFetch } from '../helpers/useFetch';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const BatchImport = () => {
  const { data: bookData } = useFetch('/api/books');
  const { data: loanerData } = useFetch('/api/loaners');

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const handleBookExport = () => {
    let ws = XLSX.utils.json_to_sheet(bookData);
    let wb = { Sheets: { book_export: ws }, SheetNames: ['book_export'] };
    let excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    let data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(data, 'book_export' + fileExtension);
  };

  const handleLoanerExport = () => {
    let ws = XLSX.utils.json_to_sheet(loanerData);
    let wb = { Sheets: { loaner_export: ws }, SheetNames: ['loaner_export'] };
    let excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    let data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(data, 'loaner_export' + fileExtension);
  };

  return (
    <React.Fragment>
      <div className='col-lg-6 mb-4'>
        <div className='card text-white shadow'>
          <button type='button' style={{ padding: '33px 20px' }} className='btn btn-success btn-block' onClick={() => handleBookExport()}>
            Export all books
          </button>
        </div>
      </div>
      <div className='col-lg-6 mb-4'>
        <div className='card text-white shadow'>
          <button type='button' style={{ padding: '33px 20px' }} className='btn btn-warning btn-block' onClick={() => handleLoanerExport()}>
            Export all loaners
          </button>
        </div>
      </div>
      <div className='col-lg-6 mb-4'>
        <div className='card text-white shadow'>
          <button type='button' style={{ padding: '33px 20px' }} className='btn btn-danger btn-block' onClick={() => handleBookExport()}>
            Export all outstanding loans
          </button>
        </div>
      </div>
      <div className='col-lg-6 mb-4'>
        <div className='card text-white shadow'>
          <button type='button' style={{ padding: '33px 20px' }} className='btn btn-info btn-block' onClick={() => handleBookExport()}>
            Export all transactions
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BatchImport;
