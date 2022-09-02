const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MANGO_URI)
        
        console.log(`MangoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (err) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB