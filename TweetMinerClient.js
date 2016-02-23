// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "tweets".

Tweets = new Meteor.Collection("tweets");


if (Meteor.isClient) {
    Template.tweetFeed.helpers({
        tweets : function () {
            return Tweets.find({}, {sort: {name: 1}});
        }
    });
}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Tweets.find().count() === 0) {
            var names = ["Ada Lovelace",
                "Grace Hopper",
                "Marie Curie",
                "Carl Friedrich Gauss",
                "Nikola Tesla",
                "Claude Shannon"];
            for (var i = 0; i < names.length; i++)
                Tweets.insert({name: names[i]});
        }
    });
}

