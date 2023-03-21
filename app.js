const express = require('express')
const cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const app = express()
const port = 5000
const globalRouter = require('./routes')
const { sequelize }= require('./models')

sequelize.sync({ force: false })
    .then(() => {
        console.log('Sync success');
    })
    .catch((error) => {
        console.error('Sync error', error);
    });

app.use(
    cors({
        origin: '*',
        credentials: true,
        optionsSuccessStatus: 200,
    })
)
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

app.use(express.static('public'))

app.use('/api', globalRouter)

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})
