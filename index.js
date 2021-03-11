// require your server and launch it
const server = require('./api/server');

const port = process.env.PORT || 4000;

server.listen(port, () => 
console.log(`Port ${port} is working. Fucking sick. Shout out to my homies at Lady Footlocker`)
)