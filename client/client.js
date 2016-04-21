import { Meteor } from 'meteor/meteor';
/*import { Accounts } from 'meteor/accounts-base';



 Accounts.ui.config({
 passwordSignupFields: 'USERNAME_ONLY'
 });*/


Meteor.startup(function () {
    Meteor.setInterval(function () {
        Meteor.call("updateRank");
    }, 1000 * 15);

    Meteor.setInterval(function () {
        Meteor.call("updateMention");
    }, 1000 * 15);

    Meteor.call("refreshRandom");

    Meteor.setInterval(function () {
        Meteor.call("updateTraffic");
    }, 1000);

    Meteor.setInterval(function () {
        Meteor.call("updateSentiment");
    }, 1000 * 15);

    Meteor.setInterval(function () {
        Meteor.call("updateHeatMap");
    }, 1000 * 15);

    Meteor.setInterval(function () {
        Meteor.call("updateWordcloud");
    }, 1000 * 15);

});


Template.topic10.helpers({
    tweets: function () {
        var results = Data.find({type: "hashtag10"}).fetch()[0];
        return results["entries"];
    }

});

Template.mention10.helpers({
    tweets: function () {
        var results = Data.find({type: "mention"}).fetch()[0];
        return results["entries"];
    }

});

Template.random10.helpers({
    tweets: function () {
        var results = Data.find({type: "random10"}).fetch()[0];
        return results["entries"];
    }
});

Template.refreshButton.events({
    "click .buttonRefresh": function () {
        console.log("click buttion");
        Meteor.call("refreshRandom");
    }
});

Template.script_template.onRendered(function () {
    $(document).ready(function () {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "tweetspersec.js";
        $("#script_div").append(script);
    });
});

Template.sentiment.onRendered(function () {
    $(document).ready(function () {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "sentiment.js";
        $("#sentiment_div").append(script);
    });
});

Template.wordcloud.onRendered(function () {
    $(document).ready(function () {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "wordcloud.js";
        $("#wordcloud_div").append(script);
    });
});

Template.heatmap.onRendered(function () {
    $(document).ready(function () {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "heatmap.js";
        $("#statesvg").append(script);
    });
});


