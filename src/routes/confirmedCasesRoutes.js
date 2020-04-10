const express = require('express')
const ConfirmedCasesModel = require('../model/confirmedCases')
const app = express();
const request = require('request');
const cheerio = require('cheerio');

app.get('/confirmedcases', async (req, res) => {


    const activeCases = await ConfirmedCasesModel.find({});


    try {
        res.send(activeCases);
    } catch (err) {
        res.status(500).send(err);
    }

})

app.get('/current_status', async (req, res) => {

    const URL = 'https://www.health.gov.au/news/health-alerts/novel-coronavirus-2019-ncov-health-alert/coronavirus-covid-19-current-situation-and-case-numbers'

    request(URL, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //   console.log('body:', body); // Print the HTML for the Google homepage.
        const $ = cheerio.load(body);
        //const tableBody = $('tbody > tr > td').text();

        //  console.log(tableBody);
        //  console.log(typeof tableBody)
        
        let location = [];
            $('tbody>tr>td').each(function(i, elem) {
                location[i] = $(this).text();
            });

        // console.log(location)
        // console.log(typeof location)  //object
        

        let data = Object.keys(location).map(function (key) { 
          
            // Using Number() to convert key to number type 
            // Using obj[key] to retrieve key value 
            // .replace(/(\r\n|\n|\r)/gm,"") This javascript code removes all 3 types of line breaks
            location[key] = location[key].replace(/(\r\n|\n|\r)/gm,"").trim().replace(',','');
            return [location[key]]; 
        }); 
        
        // console.log(data);
        // console.log(typeof data); //object

         let dataArr =[];

         for(let i =0;i<data.length-1;i=i+2)
         {
             let location = data[i][0];
             let confirmed_cases = data[i+1][0];
             let obj = {location,confirmed_cases};
            dataArr.push(obj);
         }
        
       // console.log(dataArr)
        try {
            res.send(dataArr);
        } catch (err) {
            res.status(500).send(err);
        }





        //*********************
        //get comfirmed cases
        //*********************
    //     const tableNum = $('td.numeric').text();
    //     //console.log(tableNum);
    //    let arr = [];
    //     arr = tableNum.split('\n');
    //     // console.log(arr)
    //     // console.log(typeof arr)
    //    var num = Object.keys(arr).map(function (key) { 
          
    //         // Using Number() to convert key to number type 
    //         // Using obj[key] to retrieve key value 
    //         return [arr[key]]; 
    //     }); 

    //     // console.log(num)
    //     // console.log(typeof num)

    //     for(let i =0;i<num.length;i++){

    //         num[i] = num[i].toString().trim().replace(',','');
            
    //     }
    //     for(let i =0;i<num.length;i++){
    //         if(num[i]==''){
    //             num.splice(i, 1)
    //         }
    //     }
    //     console.log(num)
        //console.log(typeof num)  //object


      




    });


})




app.post('/confirmedcases', async (req, res) => {

    const newCases = new ConfirmedCasesModel(req.body);

    try {
        await newCases.save();
    } catch (err) {
        res.status(500).send(err);
    }

})


module.exports = app