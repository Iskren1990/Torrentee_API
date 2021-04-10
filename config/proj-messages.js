module.exports = {
    errorMsg: {
        userErr: {
            unameUsed: "Username is already taken, please use another",
            wrongCred: "Wrong credentials",
            wrongUname: "Incorrect username or password.",
            wrongEmail: "Incorrect email or password.",
            emailUsed: "Email is already taken, please use another",
            notLogged: "You need to be logged in.",
            loggedUser: "You are already logged in.",
        },
        inputErr: {
            wrongLength: (field = "Field", limit = "the minimum") => `${field} should be between than ${limit} characters.`,
            emptyField: "Name, Price and ImageUrl are required.",
            wrongChar: "Latin characters and numbers.",
            wrongUrl: "Image url is required and should point to actual image",
            notNumber: (age) => `${age} should be a number`,
            notUnique: (name = "ID") => `${name} should be unique`,
        },
        commentErr: {
            commentNotModified: "Comment was not added",
            commentNotCreated: "Unable to add comment",
            noCommentsFound: "no comments found",
            failedToModify: "Failed to modify comment",
            failedToDelete: "Failed to delete your comment"
        },
        replyErr: {
            replyNotCreated: "Could not add a reply",
        },
        torrentErr: {
            requiredField: (field = "Field") => `${field} is required!`
        },
        serverErr: {
            serverErr: "It’s not you. It’s us. Give it another try, please.",
            general: "Something went wrong, please excuse us and try again",
        }
    },
}