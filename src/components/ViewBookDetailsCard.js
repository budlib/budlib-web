import React from 'react';
import { useTranslation } from 'react-i18next';

const ViewBookDetailsCard = ({ data }) => {
  const { t } = useTranslation('books');
  let customImg = data['imageLink'];
  let defaultImg = customImg || `${process.env.PUBLIC_URL + '/images/no_image_book_v2.jpg'}`;

  return (
    <div className='col-lg-8'>
      <div className='card shadow mb-4'>
        <div className='card-header py-3'>
          <h6 className='m-0 font-weight-bold text-primary'>Details</h6>
        </div>

        <div className='card-body'>
          <div className='row'>
            <div className='col-lg-6'>
              <table className='table table-borderless'>
                <tbody>
                  <tr>
                    <th style={{ width: '60%' }}>{t('bookId')}</th>
                    <td>{data['bookId']}</td>
                  </tr>
                  <tr>
                    <th style={{ width: '60%' }}>{t('isbn10')}</th>
                    <td>{data['isbn_10'] || '-'}</td>
                  </tr>
                  <tr>
                    <th style={{ width: '60%' }}>{t('isbn13')}</th>
                    <td>{data['isbn_13'] || '-'}</td>
                  </tr>
                  <tr>
                    <th style={{ width: '60%' }}>{t('totalQuantity')}</th>
                    <td>{data['totalQuantity']}</td>
                  </tr>
                  <tr>
                    <th style={{ width: '60%' }}>{t('availableQuantity')}</th>
                    <td>{data['availableQuantity']}</td>
                  </tr>
                  <tr>
                    <th style={{ width: '60%' }}>{t('librarySection')}</th>
                    <td>{t(data['librarySection']) || '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='col-lg-1'></div>

            <div className='col-lg-5 py-2 pl-5'>
              <div className='o-hidden' style={{ height: '300px', width: '230px' }}>
                <img src={defaultImg} className='card-img-top img-thumbnail' alt='' style={{ height: '100%', objectFit: 'scale-down' }} />
              </div>
            </div>
          </div>

          <table className='table table-borderless'>
            <tbody>
              <tr>
                <th style={{ width: '30%' }}>{t('title')}</th>
                <td>{data['title'] || '-'}</td>
              </tr>
              <tr>
                <th style={{ width: '30%' }}>{t('subtitle')}</th>
                <td>{data['subtitle'] || '-'}</td>
              </tr>
              <tr>
                <th style={{ width: '30%' }}>{t('authors')}</th>
                <td>{data['authors'] || '-'}</td>
              </tr>
              <tr>
                <th style={{ width: '30%' }}>{t('publisher')}</th>
                <td>{data['publisher'] || '-'}</td>
              </tr>
              <tr>
                <th style={{ width: '30%' }}>{t('edition')}</th>
                <td>{data['edition'] || '-'}</td>
              </tr>
              <tr>
                <th style={{ width: '30%' }}>{t('year')}</th>
                <td>{data['year'] || '-'}</td>
              </tr>
              <tr>
                <th style={{ width: '30%' }}>{t('language')}</th>
                <td>{data['language'] || '-'}</td>
              </tr>
              <tr>
                <th style={{ width: '30%' }}>{t('tags')}</th>
                <td>
                  {data['tags']?.map((eachTag) => {
                    return eachTag['tagName'] + ', ';
                  })}
                </td>
              </tr>
              <tr>
                <th style={{ width: '30%' }}>{t('retailPrice')}</th>
                <td>$ {data['priceRetail'] || '-'}</td>
              </tr>
              <tr>
                <th style={{ width: '30%' }}>{t('libraryPrice')}</th>
                <td>$ {data['priceLibrary'] || '-'}</td>
              </tr>
              <tr>
                <th style={{ width: '30%' }}>{t('additionalNotes')}</th>
                <td>{data['notes'] || '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewBookDetailsCard;
