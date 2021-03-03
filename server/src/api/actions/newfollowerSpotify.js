const { default: axios } = require("axios");
const db = require("../../models");
const Actions = db.actions;

const nameAction = "New follower Spotify"

async function create() {
    obj = await Actions.findOne({ where: {name: nameAction}})
    const action = {
        name: nameAction,
        serviceId: 4,
        description: "Check if there is a new follower",
        params: ""
    };
    if (!obj) {
        await Actions.create(action); 
    }else {
        if (obj.name != action.name) {
            obj.name = action.name;
        }
        if (obj.serviceId != action.serviceId) {
            obj.serviceId = action.serviceId;
        }
        if (obj.description != action.description) {
            obj.description = action.description;
        }
        if (obj.params != action.params) {
            obj.params = action.params;
        }
        await obj.save();
    }
}
module.exports.create = create;

async function run(element) {
    const token = await Tokens.findOne({ where : { userId: element.userId, serviceId: element.serviceId }}).accessToken;
    const lastFollowers = Number(element.lastResult)
    let count = 0;
    const res = await axios.get('https://api.spotify.com/v1/me',
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).catch((error) => {
        console.log(error.message)
    });
    count = res.data.followers.total;
    if (count && lastFollowers != count) {
        element.lastResult = count;
        await element.save();
        if (lastFollowers < count) {
            return true;
        }
    }
    return false;
}
module.exports.run = run;