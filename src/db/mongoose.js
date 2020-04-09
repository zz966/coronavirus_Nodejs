const mongoose = require('mongoose')

const uri = "mongodb+srv://zhanzhihang:zhanzhihang123@austatistic-z1ozl.mongodb.net/coronavirusDB?retryWrites=true&w=majority";

mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('connected', function(){
    console.log('mongoose connection success')
});

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));