import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ bookId, title, subtitle, authors, publisher, librarySection, imageLink, bookTags }) => {
  subtitle = subtitle || '';
  imageLink = imageLink || `${process.env.PUBLIC_URL + '/images/no_image_book_v2.jpg'}`;
  librarySection = librarySection || 'NA';
  let bookBy = authors || publisher;

  let allTags = bookTags.split(' ');

  let displayTitle = title;

  if (subtitle !== '') {
    displayTitle = title + ': ' + subtitle;
  }

  return (
    <div className='col-xxl-2 col-xl-3 col-lg-5 col-md-6 col-sm-6 my-3'>
      <div className='card shadow' style={{ height: '390px', overflow: 'hidden' }}>
        <Link to={`/books/${bookId}`} style={{ textDecoration: 'none' }}>
          <img className='card-img-top' alt='' src={imageLink} style={{ width: '100%', height: '250px', objectFit: 'contain' }} />
          <div className='card-body py-1'>
            <p
              className='card-text font-weight-bolder my-1'
              style={{
                fontSize: '15px',
                color: '#000000',
                overflow: 'hidden',
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
              className='card-text my-0'
              style={{
                fontSize: '13px',
                color: '#888888',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '1',
                lineClamp: '1',
                WebkitBoxOrient: 'vertical',
              }}
            >
              by {bookBy}
            </p>

            <p
              className='card-text'
              style={{
                fontSize: '13px',
                color: '#000000',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '1',
                lineClamp: '1',
                WebkitBoxOrient: 'vertical',
              }}
            >
              Section: {librarySection}
            </p>
          </div>
          <div
            className='card-body py-0 px-3 mb-2'
            style={{
              fontSize: '15px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              lineClamp: '1',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {allTags.map((tag) => {
              return (
                <React.Fragment>
                  <span key={`${bookId} ${tag}`} className='badge bg-primary mx-1 text-white'>
                    {tag}
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
