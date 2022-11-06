const express = require('express')
const cors = require('cors')
const app = express()
const cookiePerser = require('cookie-parser')
app.use(cookiePerser())
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000
app.use(express.json())
require('./db/db')

// app.use(
//     cors({
//         origin: [`https://${process.env.HOST}`, `http://${process.env.HOST}`, `${process.env.HOST}`],
//         methods: ["GET", "POST", "PUT", "OPTIONS", "DELETE"],
//         credentials: true, // enable set cookie
//     })
// );

app.use(cors())

app.use(require('./routes/auth'))

app.listen(PORT, () => {
    console.log('server run successfully at', PORT);
})