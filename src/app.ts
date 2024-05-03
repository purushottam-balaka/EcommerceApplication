import  express, {Request, Response} from 'express'
import logger from '../logger'
import { pstgpl} from './postgraphile'
import 'reflect-metadata'
import { AppDataSource } from './data-source'

const app=express();
app.use(pstgpl)
AppDataSource.initialize()
    .then(()=>{
        logger.info('Database Connected')
    })
    .catch((err)=>{
        logger.error(err)
    })
app.use('/api/healthcheck',(req:Request, res:Response)=>{
    res.send('App is healthy')
})
const PORT=5000
app.listen(PORT,()=>{
    logger.info(`App in running on ${PORT}`)
})