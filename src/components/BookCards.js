import React from 'react';
import { useFetch } from '../helpers/useFetch';
import BookCard from './BookCard';

function BookCards(props) {
  const url = '/api/books';
  let thisurl = url + '?searchBy=' + props.searchBy + '&searchTerm=' + props.searchTerm;

  const { data } = useFetch(thisurl);

  return (
    <div className='row pt-3'>
      {data.map((dataItem) => {
        return <BookCard key={dataItem['bookId']} {...dataItem} />;
      })}
    </div>
  );
}

export default BookCards;
