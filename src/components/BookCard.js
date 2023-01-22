import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BookCard = ({ bookId, title, subtitle, authors, publisher, librarySection, imageLink, tags }) => {
  const { t } = useTranslation('books');
  subtitle = subtitle || '';
  imageLink = imageLink || `${process.env.PUBLIC_URL + '/images/no_image_book_v2.jpg'}`;
  librarySection = librarySection || 'NA';
  let bookBy = authors || publisher;
  let byCount = bookBy?.split(',')?.length ?? 0;

  let displayTitle = title;

  if (subtitle !== '') {
    displayTitle = title + ': ' + subtitle;
  }

  return (
    <div className='col-xxl-2 col-xl-3 col-lg-5 col-md-6 col-sm-6 p-4'>
      <div className='card shadow o-hidden' style={{ maxHeight: '390px' }}>
        <Link to={`/books/${bookId}/view`} style={{ textDecoration: 'none' }}>
          <img className='card-img-top' alt='' src={imageLink} style={{ width: '100%', height: '250px', objectFit: 'contain' }} />
          <div className='card-body py-1'>
            <p
              className='card-text o-hidden font-weight-bolder my-1'
              style={{
                fontSize: '15px',
                color: '#000000',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                lineClamp: '2',
                WebkitBoxOrient: 'vertical',
              }}
            >
              {displayTitle}
            </p>

            <p
              className='card-text o-hidden my-0'
              style={{
                fontSize: '13px',
                color: '#888888',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '1',
                lineClamp: '1',
                WebkitBoxOrient: 'vertical',
              }}
            >
              {t('by', {authors: bookBy, count: byCount})}
            </p>

            <p
              className='card-text o-hidden pt-1'
              style={{
                fontSize: '13px',
                color: '#000000',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '1',
                lineClamp: '1',
                WebkitBoxOrient: 'vertical',
              }}
            >
              {t('section:', {section: t(librarySection)})}
            </p>
          </div>
          <div
            className='card-body o-hidden py-0 px-3 mb-2'
            style={{
              fontSize: '15px',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              lineClamp: '1',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {tags?.map((tag) => {
              return (
                <React.Fragment>
                  <span key={`${bookId}_${tag['tagId']}`} className='badge bg-primary mx-1 text-white'>
                    {tag['tagName']}
                  </span>
                </React.Fragment>
              );
            })}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
