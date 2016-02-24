

if(Meteor.isClient) {
    Meteor.startup(function() {
        Meteor.setInterval(function() {
            Meteor.call("updateRank");
        },1000*60);

        Meteor.setInterval(function() {
            Meteor.call("updateMention");
        }, 1000*60);

        Meteor.call("updateRandom");

        Meteor.setInterval(function() {
            Meteor.call("updateTraffic");
        }, 1000);

    });

    Template.topic10.helpers({
       tweets: function() {
           return Data.find({type:"hashtag10"}).fetch()["entries"];
       }

    });

    Template.mention10.helpers({
        tweets: function() {
            return Data.find({type:"mention"}).fetch()["entries"];
        }

    });

    Template.random10.helpers({
        tweets: function() {
            return Data.find({type:"random10"}).fetch()["entries"];
        }

    });

}