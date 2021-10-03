const app = require('../app');
const http = require('http');
require('dotenv').config();

const port = process.env.APP_PORT || '8080';

const server = http.createServer(app);
server.listen(port);