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
        default: "/static/media/space-leader.d453f24b.svg",
    }
});

userSchema.pre("save", async function () {
    this.password = await bcrypt.hashSync(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);