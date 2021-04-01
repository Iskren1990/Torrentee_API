const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "",
    },
    torrents:  {
        type: [
            {
            type: "ObjectId",
            // reff users uploaded torrents
            }],
        default: []
    } 
});

userSchema.pre("save", async function () {
    this.password = await bcrypt.hashSync(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);