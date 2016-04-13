import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


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

    },

    updateWordcloud: function() {
        HTTP.get('http://tweetminer.herokuapp.com/real-time/wordcloud',
            function(error, response) {
                if(!error) {
                    console.log("get http success-for wordcloud");
                    var obj = JSON.parse(response.content);
                    var wordcloud = obj["WordCloud"];
                    //var wordcloud = [{ "_id" : { "oid" : "56fa06eaa5cf4d57dc022885" }, "category" : "wordCloud", "keyword" : "man", "count" : 31 }, { "_id" : { "oid" : "56fa06eaa5cf4d57dc022886" }, "category" : "wordCloud", "keyword" : "free", "count" : 12 }];

                    if(Data.find({type: "WordCloud"}).count() === 0 ) {
                        Data.insert({type: "WordCloud", wordcloud: wordcloud});
                    }else {
                        Data.update({type: "WordCloud"}, {$set: {wordcloud: wordcloud}});
                    }
                }
            });

    },

    updateHeatMap: function() {
        HTTP.get('http://tweetminer.herokuapp.com/real-time/heatmap',
            function(error, response) {
                if(!error) {
                   // console.log("get http success-for heat map---------");
                    var obj = JSON.parse(response.content);
                    var States = obj["States"];
                    //console.log(heatmap);
                    //[{ "_id" : { "oid" : "56f9d0d8dd084e71ed92e962" }, "category" : "heatmap", "state" : "DE", "count" : 0 }, { "_id" : { "oid" : "56f9d0d8dd084e71ed92e963" }, "category" : "heatmap", "state" : "HI", "count" : 0 }
                    if(Data.find({type: "HeatMap"}).count() === 0 ) {
                        Data.insert({type: "HeatMap", heatmap: States});
                    }else {
                        Data.update({type: "HeatMap"}, {$set: {heatmap: States}});

                    }
                }
            });

    },

    updateSentiment: function() {
        HTTP.get('http://tweetminer.herokuapp.com/real-time/sentiment',
            function(error, response) {
                if(!error) {
                    console.log("get http success-for Sentiment---------");
                    var obj = JSON.parse(response.content);
                    var val = obj["Sentiment"];
                    //console.log(heatmap);
                    //[{ "_id" : { "oid" : "56f9d0d8dd084e71ed92e962" }, "category" : "heatmap", "state" : "DE", "count" : 0 }, { "_id" : { "oid" : "56f9d0d8dd084e71ed92e963" }, "category" : "heatmap", "state" : "HI", "count" : 0 }
                    if(Data.find({type: "Sentiment"}).count() === 0 ) {
                        Data.insert({type: "Sentiment", sentiment: val});
                    }else {
                        Data.update({type: "Sentiment"}, {$set: {sentiment: val}});
                        //console.log("insert succeeded");
                        //console.log(val);
                    }
                }
            });

    },

    'tasks.insert'(text) {
        check(text, String);

        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.insert({
            text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
    },
    'tasks.remove'(taskId) {
        check(taskId, String);

        Tasks.remove(taskId);
    },
    'tasks.setChecked'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);
        Tasks.update(taskId, { $set: { checked: setChecked } });
    }

});