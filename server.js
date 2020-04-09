console.log('start')
const mongoose = require('mongoose')

const uri = "mongodb+srv://zhanzhihang:zhanzhihang123@austatistic-z1ozl.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })

// const { MongoClient } = require('mongodb');
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    // const uri = "mongodb+srv://zhanzhihang:zhanzhihang123@austatistic-z1ozl.mongodb.net/test?retryWrites=true&w=majority";


    // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        //await client.connect();

        // Make the appropriate DB calls
       // await listDatabases(client); 

       //insert one recrod
        // await createListing(client,
        //     {
        //         state_name: 'new south wales',
        //         active_cases: 1000,
        //         time:new Date()
        //     }
        // );

        // await findOneListingByName(client, "new south wales");
        // await findAll(client);
       

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

}

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

//store one record
async function createListing(client, newListing) {
    const result = await client.db("coronavirusDB").collection("Au").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

// store multiple records
async function createMultipleListings(client, newListings){
    const result = await client.db("coronavirusDB").collection("Au").insertMany(newListings);

    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);

}


//read one record
async function findOneListingByName(client, nameOfListing) {
    result = await client.db("coronavirusDB").collection("Au")
                        .findOne({ state_name: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
        
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

//find all
async function findAll(client) {
    result = await client.db("coronavirusDB").collection("Au")
                        .find();

    if (result) {
       // console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        //console.log(result);
        const results = await result.toArray();
        console.log(results);
    } else {
        console.log(`No listings found `);
    }
}


// main().catch(console.error);

