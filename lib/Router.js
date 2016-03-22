/**
 * Created by huwenting on 3/21/16.
 */
Router.route('/sentiment', function () {
    this.render('sentiment');
});

Router.route('/heatmap', function () {
    this.render('heatmap');
});

Router.route('/', function () {
    this.render('homepage');
});

