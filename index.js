import express from 'express'
import dotenv from 'dotenv'
import { dbConn } from './dbConn.js'

import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config({})
const app = express()

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'frontend/dist' directory
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use(express.json())


const data = [
    {
        "merchantId": "101",
        "stakeholders": [
          { "name": "David Anderson", "type": "percentage", "value": 85 },
          { "name": "Rachel Adams", "type": "percentage", "value": 10 },
          { "name": "Benjamin Carter", "type": "fixed", "value": 5 }
        ]
      },
      {
        "merchantId": "102",
        "stakeholders": [
          { "name": "Megan Hall", "type": "percentage", "value": 75 },
          { "name": "Brian Lee", "type": "percentage", "value": 20 },
          { "name": "Laura White", "type": "fixed", "value": 5 }
        ]
      },
      {
        "merchantId": "103",
        "stakeholders": [
          { "name": "Daniel Harris", "type": "percentage", "value": 65 },
          { "name": "Sophia Young", "type": "percentage", "value": 25 },
          { "name": "Jacob Allen", "type": "fixed", "value": 10 }
        ]
      },
      {
        "merchantId": "104",
        "stakeholders": [
          { "name": "Ethan Clark", "type": "percentage", "value": 80 },
          { "name": "Chloe Lewis", "type": "percentage", "value": 15 },
          { "name": "Liam Turner", "type": "fixed", "value": 5 }
        ]
      },
]

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});
app.get('/api/data',(req,res)=>{
    res.json(data)
})
// {
//     "merchantId":"***",
//     merchantName:"************",
//     "type":"*********",
//     "value":"************"
//     }
app.post('/api',(req,res)=>{
    try{
        const {minValue,maxValue,type}=req.body
        const arr=[]
        data.map(ele=>{
            ele.stakeholders.map(ele2=>{
                if(ele2.type==type && ele2.value>=minValue && ele2.value<=maxValue){
                    arr.push(
                        {
                            "merchantId":ele.merchantId,
                            "merchantName":ele2.name,
                            "type":ele2.type,
                            "value":ele2.value
                        }
                    )
                    // arr.push(ele2)
                }
            })
            
        })
        // console.log(d)

        res.json(arr)
    }catch(err){
        console.log(err)
    }
})
// dbConn()
app.listen(3000,()=>{
    console.log('server is running at 3000')
})