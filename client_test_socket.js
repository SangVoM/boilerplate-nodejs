const io = require('socket.io-client');
console.log('START CONNECT');
const jwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzYW5ndm1Adm5leHQuY29tLnZuIiwiaWF0IjoxNjI4MjM3MTM0LCJleHAiOjE2MjkxMDExMzR9.FDL0zbJWj3jVjOuaMeVJzSeTgeMGWEbJNDgntArP_NE';
const socket = io('http://127.0.0.1:3000', {
    transports: ['websocket'],
    extraHeaders: { Authorization: `Bearer ${jwt}` }
});
console.log('>>>>>>>>');
