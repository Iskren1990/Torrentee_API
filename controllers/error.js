const fs = require("fs");
const filePath = require("path").resolve(__dirname + "/../logs/error.txt");
// const filePath = path.resolve(__dirname + "/../logs/error.txt");
const stream = fs.createWriteStream(filePath, { 'flags': 'a' , 'encoding': null , 'mode': 0666 });

const error = {
    post: async (req, res, next) => {
        
        try {
            const  errorData = JSON.stringify(req.body);
            stream.write(`[ ${new Date().toLocaleString("bg-BG")} ] : `+ errorData + "\n");
            res.end();
        } catch (error) {
            console.log(error);
            // global error handler here
            res.end();
        }
    }
}

module.exports = { error };