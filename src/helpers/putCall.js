export async function putCall(endpoint, payload) {
  const hosting = 'http://localhost:8080';
  let url = '';

  if (endpoint !== '' && endpoint !== undefined && endpoint.charAt(0) !== '/') {
    url = hosting.concat('/', endpoint);
  } else {
    url = hosting.concat(endpoint);
  }

  const response = await fetch(url, {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(payload),
  });

  const status = response.status;
  const data = await response.json();

  return { status, data };
}