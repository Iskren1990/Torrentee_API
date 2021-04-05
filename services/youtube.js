const tubeKey = process.env.YTB_KEY;
const fetch = require("node-fetch");

const YoutubeAPI = {
    get: async (search) => {
        let tubeRes;
        try {
            res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${search}&key=${tubeKey}`)
            tubeRes = await res.json();
            return tubeRes.map(x => x.items[0].id.videoId);
        } catch (error) {
            console.log(error, tubeRes.message);
            return [];
        }
    }
}

module.exports = YoutubeAPI;

    


