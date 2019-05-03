const mongoose = require("mongoose");


const matchSchema = new mongoose.Schema({
    home: {
        ref: "Team",
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    away: {
        ref: "Team",
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    round: {
        type: Number,
        required: true,
        min: 1,
        max: 36
    },
    time: {
        type: Date,
        required: true,
        default: Date.now()
    }
}, {
    toObject: {
        virtuals: true
    }
})


matchSchema.virtual("events", {
    ref: "MatchEvent",
    localField: "_id",
    foreignField: "match"
})


matchSchema.statics.getRoundMatches = async function( round_number ) {
    let fetchedMatches = await Match.find({ round: round_number }).populate("events")
    let matches = [];
    for(let i = 0; i < fetchedMatches.length; i++ ){
        matches[i] = {};
        matches[i]._id = fetchedMatches[i]._id,
        matches[i].home = fetchedMatches[i].home,
        matches[i].away = fetchedMatches[i].away,
        matches[i].round = fetchedMatches[i].round,
        matches[i].time = fetchedMatches[i].time,
        matches[i].homeScore = fetchedMatches[i].homeScore,
        matches[i].awayScore = fetchedMatches[i].awayScore
    }
    return matches;
}


matchSchema.statics.getMatchReport = async function(_id) {
    let match = await Match.findById(_id).populate("events")
    return {
        _id: match._id,
        home: match.home,
        away: match.away,
        round: match.round,
        time: match.time,
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        events: match.events,
    };
}


matchSchema.virtual("homeScore").get( function() {
    const events = this.events;
    if(!events) return 0;
    let homeScore = 0;

    for (const event of events) {
        if( event.team.toString() == this.home.toString() && event.typeEvent === "goal" ) homeScore++;
        if( event.team.toString() == this.away.toString() && event.typeEvent === "owngoal" ) homeScore++;
    }

    return homeScore;
})


matchSchema.virtual("awayScore").get( function() {
    const events = this.events;
    if(!events) return 0;
    let awayScore = 0;

    for (const event of events) {
        if( event.team.toString() == this.away.toString() && event.typeEvent === "goal" ) awayScore++;
        if( event.team.toString() == this.home.toString() && event.typeEvent === "owngoal" ) awayScore++;
    }
    
    return awayScore;
})


const Match = mongoose.model("Match", matchSchema);


module.exports = Match;