const express = require('express');
const User = require("../controllers/User");

const router = express.Router();

router.get("/user_list", async function(req, res){
    const user = new User();
    await user.getAllUser(req, res);
});


router.post("/add_user", async function(req, res){
    const user = new User();
    await user.addUser(req, res);
});


router.post("/delete_user", async function(req, res){
    const user = new User();
    await user.deleteUser(req, res);
});


router.post("/find_user", async function(req, res){
    const user = new User();
    await user.findUser(req, res);
});

router.put("/update_user", async function(req, res){
    const user = new User();
    await user.updateUser(req, res);
});

module.exports = router;