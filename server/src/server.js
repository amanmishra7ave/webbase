const http = require('http');
const app = require('./app');
var  { loadPlanetsData }  = require('./models/planets.model'); // Import loadPlanetsData correctly

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

async function startServer() {
    await loadPlanetsData();

} 

server.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}...`)
});
startServer();

