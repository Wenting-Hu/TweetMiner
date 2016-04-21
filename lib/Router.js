/**
 * Created by huwenting on 3/21/16.
 */


Router.route('/', function () {
    this.render('homepage');
});

Router.route('/table', function () {
    this.render('table');
});

Router.route('/sentiment', {
    name: 'sentiment',
    waitOn: function () {
        //console.log(Meteor.subscribe('HeatMap'))
        return [
            Meteor.subscribe('Sentiment')
        ];
    },
    onBeforeAction: function () {
        this.next();
    }
});

Router.route('/heatmap', {
    name: 'heatmap',
    waitOn: function () {
        //console.log(Meteor.subscribe('HeatMap'))
        return [
            Meteor.subscribe('HeatMap')
        ];
    },
    onBeforeAction: function () {
        this.next();
    }
});


Router.route('/wordcloud', {
    name: 'wordcloud',
    waitOn: function () {
        return [
            Meteor.subscribe('WordCloud')
        ];
    },
    onBeforeAction: function () {
        this.next();
    }
});

