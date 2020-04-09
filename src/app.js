const express = require('express')
const path = require('path')
const app = express();
const publicDirectoryPath = path.join(__dirname,'../public');
app.use(express.static(publicDirectoryPath))
const port = process.env.port || 3000
const cors = require('cors')


app.use(express.json())  //pass incoming json to object, so we can accese it with request.body
app.use(cors())

require('./db/mongoose')
// import router and use router 
const confirmedCasesRoute = require('./routes/confirmedCasesRoutes')

app.use(confirmedCasesRoute);  

app.get('/help',(req,res)=>{
    res.send('help page')
})


app.get('/about',(req,res)=>{
    res.send('about page')
})


app.listen(port,()=>{
    console.log(`server is up on port ${port}`)
})