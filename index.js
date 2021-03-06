/**
 * Entry point for 408 Game server.
 * @author Team 3
 */

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const routing = require('./src/server/router');
const SocketManager = require('./src/server/socket');

/**
 * For timestamped console messages.
 * It makes for easier debugging.
 */
require('log-timestamp');

const portNumber = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routing);

// Set the view engine to handlebars.
app.set('views', 'src/views/');
app.engine('.hbs', exphbs({
  layoutsDir: 'src/views/',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use('/',  express.static('./public'));

// Start the node express server listening.
var server = app.listen(portNumber, function() {
  console.log('Listening on port:', portNumber);
});

// Set up the server to listen for socket connections with socket io.
const socketManager = new SocketManager();
socketManager.startListening(server);
