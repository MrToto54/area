const db = require("../models");
const Service = db.services;

module.exports = async () => {
    obj = await Service.findOne({ where: {name: "spotify"}})
    const Spotify = {
        name: "spotify",
        actionsId: "",
        reactionId: "",
        urlLogo: "https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-brands-logo-34.png",
        pColor: "#1ed760",
        sColor: "#ffffff",
        OAuthUrl: "https://accounts.spotify.com/authorize?response_type=code&client_id=fcd812ae0f364abea208d06cdb632e87&redirect_uri=http%3A%2F%2Flocalhost%3A8081"
    };
    if (!obj) {
        await Service.create(Spotify);
    }else {
        if (obj.name != Spotify.name) {
            obj.name = Spotify.name;
        }
        if (obj.actionsId != Spotify.actionsId) {
            obj.actionsId = Spotify.actionsId;
        }
        if (obj.reactionId != Spotify.reactionId) {
            obj.reactionId = Spotify.reactionId;
        }
        if (obj.urlLogo != Spotify.urlLogo) {
            obj.urlLogo = Spotify.urlLogo;
        }
        if (obj.pColor != Spotify.pColor) {
            obj.pColor = Spotify.pColor;
        }
        if (obj.sColor != Spotify.sColor) {
            obj.sColor = Spotify.sColor;
        }
        if (obj.OAuthUrl != Spotify.OAuthUrl) {
            obj.OAuthUrl = Spotify.OAuthUrl;
        }
        await obj.save();
    }
    return Spotify;
}