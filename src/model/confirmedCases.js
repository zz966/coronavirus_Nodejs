const mongoose = require('mongoose')

const ConfirmedCasesSchema = new mongoose.Schema({
    state_name:{
        type:String,
        required:true,
        trim:true
    },
    confirmed_cases:{
        type:Number,
        required:true,
        trim:true
    },
    record_time:{
        type:String,
        required:true,
        trim:true
    }
})

// For testing only ...
// const newActivecase = new ActiveCases({
//     state_name:'nsw',
//     active_cases:100,
//     record_time: new Date()
// })

// newActivecase.save().then( ()=>{

//     console.log (newActivecase)

// }).catch((error)=>{
//     console.log('error',error)
// })

const ConfirmedCases  = mongoose.model("ConfirmedCases",ConfirmedCasesSchema);

module.exports = ConfirmedCases