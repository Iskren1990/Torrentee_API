const fs = require("fs");
// heroku does not like files
const path = require("path");
const filePath = path.resolve(__dirname + "/../logs/error.txt");
// const stream = fs.createWriteStream(filePath, { 'flags': 'a' , 'encoding': null , 'mode': 0666 });

const error = {
    post: async (req, res, next) => {
        
        try {
            const  errorData = JSON.stringify(req.body);
            // stream.write(`[ ${new Date().toLocaleString("bg-BG")} ] : `+ errorData + "\n");
            res.status(200).json({written: "true"});
        } catch (error) {
            console.log(error);
            // global error handler here
            res.status(500).json({written: "false"});
        }
    }
}

module.exports = { error };