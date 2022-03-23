import hosting from './baseUrlAPI';

export async function downloadCall(endpoint, fileName) {
  let url = '';
  let downloadFileName = fileName || 'export.csv';

  let requestHeader = {
    'Content-Type': 'application/octet-stream',
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

  response.blob().then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = downloadFileName;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  });
}
