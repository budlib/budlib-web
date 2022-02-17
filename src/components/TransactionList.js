import React from 'react';
import { useFetch } from '../helpers/useFetch';
// import { useDateFormat } from '../helpers/useDateFormat';

const url = '/api/transactions';

const TransactionList = () => {
  const { data } = useFetch(url);

  return (
    <div className='row'>
      <div className='col-lg-10'>
        <div className='card shadow mb-4'>
          <div className='card-body'>
            <div className='table-responsive'>
              <table className='table table-bordered table-hover' id='dataTable' cellSpacing='0'>
                <thead className='table-secondary text-dark'>
                  <tr>
                    <th>Trn No</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Loaner</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Trn No</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Loaner</th>
                  </tr>
                </tfoot>
                <tbody>
                  {data.map((dataItem) => {
                    const { transactionId, transactionDateTime, transactionType, loaner } = dataItem;

                    const trnDateTime = new Date(transactionDateTime);

                    let month = '' + (trnDateTime.getMonth() + 1);
                    let day = '' + trnDateTime.getDate();
                    let year = trnDateTime.getFullYear();
                    if (month.length < 2) month = '0' + month;
                    if (day.length < 2) day = '0' + day;

                    let hour = '' + trnDateTime.getHours();
                    let minutes = '' + trnDateTime.getMinutes();
                    let seconds = '' + trnDateTime.getSeconds();
                    if (hour.length < 2) hour = '0' + hour;
                    if (minutes.length < 2) minutes = '0' + minutes;
                    if (seconds.length < 2) seconds = '0' + seconds;

                    const trnDate = [year, month, day].join('-');
                    const trnTime = [hour, minutes, seconds].join(':');

                    const trnType = transactionType.charAt(0) + transactionType.substr(1).toLowerCase();

                    return (
                      <tr key={transactionId}>
                        <td>{transactionId}</td>
                        <td>{trnDate}</td>
                        <td>{trnTime}</td>
                        <td>{trnType}</td>
                        <td>{loaner == null ? '<removed>' : loaner['fullNameWithSalutation']}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
