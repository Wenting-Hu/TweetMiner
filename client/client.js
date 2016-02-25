Data = new Meteor.Collection("data");

if (Meteor.isClient) {
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

    Template.script_template.onRendered(function() {
        $(document).ready(function() {
            var script = document.createElement("script");
            script.type="text/javascript";
            script.src = "tweetspersec.js";
            $("#script_div").append(script);
        });
    });



    Template.speedmeter.helpers({
        traffic: function () {
            return Data.find({type: "traffic"}).fetch()[0]["traffic"];
        }

    })


}