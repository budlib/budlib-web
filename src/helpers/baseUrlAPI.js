const {protocol, hostname} = window?.location ?? {};
const hosting = !!protocol && !!hostname
    ? `${protocol}//${hostname}:8080`
    : 'http://localhost:8080';

export default hosting;
