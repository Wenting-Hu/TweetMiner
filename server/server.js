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
        HTTP.get('https://tweetminer.herokuapp.com/real-time/hashtag10',
        function(error, response) {
            if(!error) {
                var obj = JSON.parse(response.content);
                var entries = obj["entries"];
                if(Data.find({type: "hashtag10"}).count() === 0 ) {
                    Data.insert({type: "hashtag10", entries: entries});
                }else {
                    Data.update({type: "hashtag10"}, {$set: {entries: entries}});
                }
            }
        });
    },

    updateMention: function() {
        HTTP.get('https://tweetminer.herokuapp.com/real-time/mention',
            function(error, response) {
                if(!error) {
                    var obj = JSON.parse(response.content);
                    var entries = obj["entries"];
                    if(Data.find({type: "mention"}).count() === 0 ) {
                        Data.insert({type: "mention", entries: entries});
                    }else {
                        Data.update({type: "mention"}, {$set: {entries: entries}});
                    }

                }
            });
    },

    refreshRandom: function() {
        HTTP.get('https://tweetminer.herokuapp.com/real-time/hashtag50',
        function(error, response) {
            if(!error) {
                console.log("get random 10");
                var obj = JSON.parse(response.content);
                var entries = obj["entries"];
                if(Data.find({type: "random10"}).count() === 0 ) {
                    Data.insert({type: "random10", entries: entries});
                }else {
                    Data.update({type: "random10"}, {$set: {entries: entries}});
                }
            }
        })
    },

    updateTraffic: function() {
        HTTP.get('https://tweetminer.herokuapp.com/real-time/traffic',
        function(error, response) {
           if(!error) {
               var obj = JSON.parse(response.content);
               if(Data.find({type: "traffic"}).count() === 0 ) {
                   Data.insert({type: "traffic", traffic: obj["traffic"]});
               }else {
                   Data.update({type: "traffic"}, {$set: {traffic: obj["traffic"]}});
               }
           }
        });

    }



})