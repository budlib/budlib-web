import React from 'react';



const ViewBookDetailsCard = ({ data }) => {
  let customImg = '';
  let defaultImg = customImg || `${process.env.PUBLIC_URL + '/images/no_image_book_v2.jpg'}`;

  return (
    <div className='col-lg-8'>
      <div className='card shadow mb-4'>
        <a href='#detailsCard' className='d-block card-header py-3' data-toggle='collapse' role='button' aria-expanded='true' aria-controls='detailsCard'>
          <h6 className='m-0 font-weight-bold text-primary'>Details</h6>
        </a>
        <div className='collapse show' id='detailsCard'>
          <div className='card-body'>
            <table className='table table-borderless'>
              <tbody>
                <tr>
                  <th style={{ width: '30%' }}>Book ID</th>
                  <td>{data['bookId']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Title</th>
                  <td>{data['title']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Subtitle</th>
                  <td>{data['subtitle']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Authors</th>
                  <td>{data['authors']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Publisher</th>
                  <td>{data['publisher']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Edition</th>
                  <td>{data['edition']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Year</th>
                  <td>{data['year']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Language</th>
                  <td>{data['language']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>ISBN_10</th>
                  <td>{data['isbn_10']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>ISBN_13</th>
                  <td>{data['isbn_13']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Library Section</th>
                  <td>{data['librarySection']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Total Quantity</th>
                  <td>{data['totalQuantity']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Available Quantity</th>
                  <td>{data['availableQuantity']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Reailt Price ($)</th>
                  <td>{data['priceRetail']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Internal Price ($)</th>
                  <td>{data['priceLibrary']}</td>
                </tr>


              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookDetailsCard;
