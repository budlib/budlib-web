import React from 'react';
import { useFetch } from '../helpers/useFetch';
import BookCard from './BookCard';

function BookCards(props) {
  const url = '/api/books';
  let thisurl = url + '?searchBy=' + props.searchBy + '&searchTerm=' + props.searchTerm;

  const { data } = useFetch(thisurl);

  return (
    <React.Fragment>
      {data.length === 0 ? (
        <div className='card shadow mt-4'>
          <div className='card-body'>
            <div className='text-secondary pt-2 text-centerr'>No books found</div>
          </div>
        </div>
      ) : (
        <div className='row pt-3'>
          {data?.map((dataItem) => {
            return <BookCard key={dataItem['bookId']} {...dataItem} />;
          })}
        </div>
      )}
    </React.Fragment>
  );
}

export default BookCards;
