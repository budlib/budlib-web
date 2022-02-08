import React from 'react';
import { useFetch } from '../helpers/useFetch';
import BookCard from './BookCard';

let url = 'http://localhost:8080/api/books';

function BookCards(searchBy, searchTerm) {
  // searchBy = toString(searchBy) || '';

  // url = url + '?searchBy=' + searchBy + '&searchTerm=' + searchTerm;

  const { loading, data } = useFetch(url);

  return (
    <div className='row pt-3'>
      {data.map((dataItem) => {
        return <BookCard key={dataItem['bookId']} {...dataItem} />;
      })}
    </div>
  );
}

export default BookCards;
