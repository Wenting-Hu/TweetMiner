Data = new Meteor.Collection("data");

if(Meteor.isServer) {


}

Meteor.methods({
    updateRank: function() {
        Data.remove({type: "hashtag10"});
        HTTP.get('https://tweetminer.herokuapp.com/real-time/hashtag10',
        function(error, response) {
            if(!error) {
                var obj = JSON.parse(response.content);
                Data.insert({type: "hashtag10", entries: obj["entries"]});
            }
        });
    },

    updateMention: function() {
        Data.remove({type: "mention"});
        HTTP.get('https://tweetminer.herokuapp.com/real-time/mention',
            function(error, response) {
                if(!error) {
                    var obj = JSON.parse(response.content);
                    Data.insert({type: "mention", entries: obj["entries"]});
                }
            });
    },

    refreshRandom: function() {
        Data.remove({type: "random10"});
        HTTP.get('https://tweetminer.herokuapp.com/real-time/hashtag50',
        function(error, response) {
            if(!error) {
                var obj = JSON.parse(response.content);
                Data.insert({type: "random10", entries: obj["entries"]});
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