const User = require("../model/userModel");
const UserHistory = require("../model/userHistory");

const getUserHistory = async (req, res) => {
    const user = await User.findOne({ _id: req.body.id });    
    if(user){
        const userHistory = await UserHistory.find({ user: user._id });
        console.log("userHistory", userHistory);
        res.status(200).json({ userHistory });
    }else {
        res.status(404).json({ msg: "User does not exists" });
    }
}

module.exports = {
    getUserHistory
}