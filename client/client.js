

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
}