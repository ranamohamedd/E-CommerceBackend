import 'dotenv/config.js'
import express from 'express'
import {dbConnection} from './db/connection.js'
import { allRoutes } from './src/modules/routes.js';
import { AppError } from './src/utils/AppError.js';
import cors from 'cors'
import git from 'git'
const app = express()
const port = 3000


app.use(cors())

app.use(express.json());
app.use("/uploads", express.static("uploads"))


dbConnection()

allRoutes(app)



app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.statusCode).json({message : err.message, stack: err.stack})
  })

app.get('/' ,(req,res) => res.send('Hello World!'))
app.listen( process.env.PORT || port, ()=> console.log(`E-Commerce app listening on port ${port}!`))
