const BaseModel = require("./BaseModel");

class UserModel extends BaseModel{
    constructor() { 
        super("");
    }
    async selectUsers(){
        try {
            const usersCollection = this.db.collection('users');
            const users = await usersCollection.find({}).toArray();
            return users;
        } catch (error) {
            console.error('Error retrieving users', error);
            return [];
        }
    }
    
    async findUsers(find_obj){
        try{
            const collection = this.db.collection('users');
            const user = await collection.find(find_obj).toArray();
            return {
                status: 200,
                data: user
            }
        } catch(err) {
            return {
                status: 500,
                data: err
            };
        }
    }
    
    async insertUser(insert_data){
        try{
            const collection = this.db.collection('users');
    
            const res = await collection.insertMany(insert_data);
            return {
                status: 200,
                data: res
            }
        } catch(err) {
            return {
                status: 500,
                data: err
            };
        }
    }
    
    async putUser(where, data){
        try{
            const collection = this.db.collection('users');
            const res = await collection.updateOne(where, { "$set": data });
            return {
                status: 200,
                data: res
            }
        } catch(err) {
            return {
                status: 500,
                data: err
            };
        }
    }

    async deleteUser(condition_obj){
        try{
            const collection = this.db.collection('users');    
            const res = await collection.deleteOne(condition_obj);
            return {
                status: 200,
                data: res
            }
        } catch(err) {
            return {
                status: 500,
                data: err
            };
        }
    }
}

module.exports = UserModel;