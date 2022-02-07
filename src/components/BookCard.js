import React from 'react';
import { Link } from 'react-router-dom';
import defaultCover from '../images/no_image_book_v2.jpg';

const BookCard = ({ bookId, title, subtitle, authors, publisher, librarySection, imageLink }) => {
  subtitle = subtitle || '';
  imageLink = imageLink || defaultCover;
  librarySection = librarySection || 'NA';
  let bookBy = authors || publisher;

  let displayTitle = title;

  if (subtitle !== '') {
    displayTitle = title + ': ' + subtitle;
  }

  return (
    <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 my-3'>
      <div className='card' style={{ width: '250px', height: '380px', overflow: 'hidden' }}>
        <Link to={`/books/${bookId}`} style={{ textDecoration: 'none' }}>
          <img className='card-img-top' src={imageLink} style={{ width: '100%', height: '250px', objectFit: 'contain' }} />
          <div className='card-body pt-2'>
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
                WebkitLineClamp: '2',
                lineClamp: '2',
                WebkitBoxOrient: 'vertical',
              }}
            >
              by {bookBy}
            </p>

            <p
              className='card-text my-1'
              style={{
                fontSize: '14px',
                color: '#000000',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                lineClamp: '2',
                WebkitBoxOrient: 'vertical',
              }}
            >
              Section: {librarySection}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
