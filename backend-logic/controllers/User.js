const UserModel = require('../models/UserModel');
const { ObjectId } = require("mongodb");

class User{
    async getAllUser(req, res){
        const user = new UserModel();
        await user.connect('crud_app');
        let result = await user.selectUsers();
        res.json(result);
    }
    async deleteUser(request, response){
        let delete_pat = this.createPattern(request);
        const user = new UserModel();
        await user.connect('crud_app');
        let res = await user.deleteUser(delete_pat);
        if(res.status === 200){
            response.status(200).json(res.data);
        }else{
            console.log(res);
            response.status(500).json("Some technical issue occur");
        }
    }
    async addUser(req, res){
        let insert_data = [
            {
                name: req.body.name,
                mobile: req.body.mobile
            }
        ]
        const user = new UserModel();
        await user.connect('crud_app');
        let result = await user.insertUser(insert_data);
        res.status(200).json(result);
    }
    async findUser(request, response){
        const find_pat = this.createPattern(request);
        const user = new UserModel();
        await user.connect('crud_app');
        let res = await user.findUsers(find_pat);
        console.log(res);
        if(res.status === 200){
            response.json(res.data);
        }else{
            console.log(res);
        }
    }
    async updateUser(request, response){
        let where = {"_id": new ObjectId(request.body.id)};
        let data = {"name": request.body.name, "mobile": request.body.mobile};
        const user = new UserModel();
        await user.connect('crud_app');
        let res = await user.putUser(where, data);
        if(res.status === 200){
            response.json(res.data);
        }else{
            console.log(res);
        }
    }
    createPattern(request){
        let action_on = request.body.action_on;
        let find_pat = {};
        if(action_on){
            if(action_on.includes(',')){
                action_on = action_on.split(",");
            }

            if(Array.isArray(action_on)){
                for(let action_key of action_on){
                    action_key = action_key.trim();
                    if(action_key !== "id"){
                        find_pat[action_key] = request.body[action_key];
                    }else{
                        find_pat["_"+action_key] = new ObjectId(request.body[action_key]);
                    }
                }
            }else{
                if(action_on !== "id"){
                    find_pat[action_on] = request.body[action_on];
                }else{
                    find_pat["_"+action_on] = new ObjectId(request.body[action_on]);
                }
            }
        }else{
            find_pat["_id"] = new ObjectId(request.body.id);
        }
        return find_pat;
    }
}

module.exports = User;