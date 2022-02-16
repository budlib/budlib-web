import React from 'react';
import { useFetch } from '../helpers/useFetch';
import BookCard from './BookCard';
import { useEffect, useState } from 'react';

let url = '/api/books';

function BookCards(props) {


  let thisurl = url + '?searchBy=' + props.searchBy + '&searchTerm=' + props.searchTerm;
  console.log(thisurl);


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
