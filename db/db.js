const mongoose = require('mongoose')

const DB_pass = process.env.PASSWORD

const DB = `mongodb+srv://hassan_1132005:${DB_pass}@cluster0.wsrimjr.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(DB).then(
    () => {
        console.log('database connected successfully');
    }
).catch(
    (err) => {
        console.log("detabase not connected", err)
    }
)