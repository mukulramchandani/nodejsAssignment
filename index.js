let express = require('express');

let app = express();

let listRoute = require('./src/routes/list');
let countRoute = require('./src/routes/count');
let searchRoute = require('./src/routes/search');


app.use(listRoute);
app.use(countRoute);
app.use(searchRoute);


const PORT = process.env.PORT || 3000 ;
app.listen(PORT, () => console.info(`Server started on ${PORT}`));