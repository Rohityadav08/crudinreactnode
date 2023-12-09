const { MongoClient } = require("mongodb");


class BaseModel{
    constructor() { 
        this.connectionString = "mongodb+srv://rohithy2018:NiwDDLiXgdZzITXl@cluster0.5sugcpt.mongodb.net/";
        this.client = new MongoClient(this.connectionString);
    }

    async connect(database) {
        try {
            await this.client.connect();
            this.db = this.client.db(database);
            console.log("Connected");
        } catch (error) {
            console.error('Error connecting to MongoDB Atlas', error);
        }
    }
    
    async close() {
        await this.client.close();
        console.log('Connection to MongoDB Atlas closed');
    }
}

module.exports = BaseModel;