const fetch = require("node-fetch");
const config = require("../config/variables");

const NewsAPI = {
    get: async (req, res) => {
        try {
            newsRes = await fetch(`${config.newsApiUrl}/top-headlines?country=bg&language=bg&apiKey=${config.newsApiKey}`)
            tubeRes = await newsRes.json();
            res.status(200).json(tubeRes)
        } catch (error) {
            console.log(error);
            res.status(500).json({ err: {}, message: "News API error" });
        }
    }
}

module.exports = { NewsAPI };