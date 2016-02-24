Data = new Meteor.Collection("data");

if(Meteor.isServer) {
    /*Meteor.startup(function() {
        Meteor.publish("mention", function() {
            return Data.find({type:"mention"});
        })

    })*/

}

Meteor.methods({
    updateRank: function() {
        Data.remove({type: "hashtag10"});
        HTTP.get('https://tweetminer.herokuapp.com/real-time/hashtag10',
        function(error, response) {
            if(!error) {
                var obj = JSON.parse(response.content);
                var entries = obj["entries"];
                Data.insert({type: "hashtag10", entries: entries});
            }
        });
    },

    updateMention: function() {
        Data.remove({type: "mention"});
        HTTP.get('https://tweetminer.herokuapp.com/real-time/mention',
            function(error, response) {
                if(!error) {
                    var obj = JSON.parse(response.content);
                    var entries = obj["entries"];
                    Data.insert({type: "mention", entries: entries});
                }
            });
    },

    refreshRandom: function() {
        HTTP.get('https://tweetminer.herokuapp.com/real-time/hashtag50',
        function(error, response) {
            if(!error) {
                var obj = JSON.parse(response.content);
                var entries = obj["entries"];
                Data.insert({type: "random10", entries: entries});
            }
        })

    },

    updateTraffic: function() {
        HTTP.get('https://tweetminer.herokuapp.com/real-time/traffic',
        function(error, response) {
           if(!error) {
               var obj = JSON.parse(response.content);
               Data.update({type:"traffic"}, {$set: {num: obj["traffic"]}});
           }
        });

    }



})