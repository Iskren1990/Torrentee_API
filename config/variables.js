module.exports = {
    production: {
    PORT:process.env.PORT,
    dbpass: process.env.DB_PASSWORD,
    dbuser: process.env.DB_UNAME,
    dbname: process.env.DB_NAME,
    key: process.env.KEY_WORD,
    tubeKey: process.env.YTB_KEY,
    newsApiUrl: process.env.NEWS_URL,
    newsApiKey: process.env.NEWS_API_KEY,
    dbOpt: { useUnifiedTopology: true,  useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false },
    uri: (conf) => `mongodb+srv://${conf.dbuser}:${conf.dbpass}@cluster0.4dqi4.mongodb.net/${conf.dbname}?retryWrites=true&w=majority`,
    cors: {
        origin: "*",
        credentials: true
    }
},
development: {
    PORT:process.env.PORT,
    dbpass: process.env.DB_PASSWORD,
    dbuser: process.env.DB_UNAME,
    dbname: process.env.DB_NAME,
    key: process.env.KEY_WORD,
    tubeKey: process.env.YTB_KEY,
    newsApiUrl: process.env.NEWS_URL,
    newsApiKey: process.env.NEWS_API_KEY,
    dbOpt: { useUnifiedTopology: true,  useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false },
    uri: (conf) => `mongodb+srv://${conf.dbuser}:${conf.dbpass}@cluster0.4dqi4.mongodb.net/${conf.dbname}?retryWrites=true&w=majority`,
    cors: {
        origin: "http://localhost:3000", 
        credentials: true
    }
}
}[process.env.NODE_ENV];
