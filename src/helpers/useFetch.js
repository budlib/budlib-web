import { useState, useEffect, useCallback } from 'react';
import hosting from './baseUrlAPI';

export const useFetch = (endpoint) => {
  let url = '';

  let requestHeader = {
    'Content-Type': 'application/json',
  };

  if (localStorage.getItem('Authenticated') === '1') {
    requestHeader['Authorization'] = `Bearer ${window.localStorage.getItem('token')}`;
  }

  if (endpoint !== '' && endpoint !== undefined && endpoint.charAt(0) !== '/') {
    url = hosting.concat('/', endpoint);
  } else {
    url = hosting.concat(endpoint);
  }

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: requestHeader,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    const data = await response.json();
    setData(data);
    setLoading(false);
  }, [url]);

  useEffect(() => {
    getData();
  }, [url, getData]);
  return { loading, data };
};
