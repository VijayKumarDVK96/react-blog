let AppRoot = '';

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  AppRoot = 'http://localhost:5000/';
} else {
  AppRoot = 'https://my-json-server.typicode.com/VijayKumarDVK96/react-blog/';
}

export default AppRoot;
