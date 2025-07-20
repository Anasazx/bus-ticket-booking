const express = require('express');
const app = express();
const travelRoute = require('./routes/travel');
const userRoute = require('./routes/user');
const ticketRoute = require('./routes/ticket');


const cors = require('cors');

require('./config/connect');
app.use(cors());

app.use(express.json());



app.use('/travel', travelRoute);

app.use('/user', userRoute);


app.use('/ticket', ticketRoute);





app.listen(3000, ()=>{
    console.log("Server work!");
});