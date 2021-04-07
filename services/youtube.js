const config = require("../config/variables");
const fetch = require("node-fetch");

const YoutubeAPI = {
    get: async (search) => {
        let tubeRes;
        try {
            res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${search}&key=${config.tubeKey}`)
            tubeRes = await res.json();

            return tubeRes.items.filter(item => item.id.videoId !== null).map(item => item.id.videoId);
        } catch (error) {
            console.log(error, tubeRes);
            return [];
        }
    }
}

module.exports = YoutubeAPI;

    


