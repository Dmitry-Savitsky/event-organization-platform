require(`dotenv`).config()

const express = require("express")
const sequelize = require(`./db`)
const models = require(`./models/models`)
const cors = require(`cors`)
const { json } = require("sequelize")
const router = require("./routes/index")

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())

// app.get(`/`, (req, res) => {
//     res.status(200).json({massage: `working . . . `})
// })


const start = async() => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))        
    } catch (error) {
        console.log(error)
    }
}

start()
