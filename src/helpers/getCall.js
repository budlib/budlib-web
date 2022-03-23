import hosting from './baseUrlAPI';

export async function getCall(endpoint) {
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

  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: requestHeader,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });

  const status = response.status;
  const data = await response.json();

  return { status, data };
}
