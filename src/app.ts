import  express, {Request, Response} from 'express'
import {errorLogger,infologger} from '../logger'
import { pstgpl} from './postgraphile'
import 'reflect-metadata'
import { AppDataSource } from './data-source'

const app=express();
app.use(pstgpl)
AppDataSource.initialize()
    .then(()=>{
        // infologger.info('Database Connected')
        console.log('Database Conneted')
    })
    .catch((err)=>{
        // errorLogger.error(err)
        console.log(err)
    })
app.use('/api/healthcheck',(req:Request, res:Response)=>{
    res.send('App is healthy')
})
const PORT=5000
app.listen(PORT,()=>{
    // infologger.info(`App in running on ${PORT}`)
    console.log(`App is running on ${PORT} `)
})