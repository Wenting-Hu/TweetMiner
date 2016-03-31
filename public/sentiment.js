/**
 * Created by huwenting on 3/21/16.
 */
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

var svg;
if (d3.select("svg").empty()) {
    svg = d3.select("#sentiment_div").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}
else {
    svg = d3.select("svg");
}
var data = Data.find({type: "Sentiment"}).fetch()[0]["sentiment"];
//var data = [{name:"Locke", value:4}, {name:"Reyes",value:8}, {name:"Ford",value: 15},{name:"Jarrah",value: 16},{name:"Shephard",value: 23},{name:"Kwon",value: 42}];
    x.domain(data.map(function(d) { return d.time["numberLong"]; }));
    y.domain([0, d3.max(data, function(d) { return d.sentiValue; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Trump Support rate");

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.time["numberLong"]); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.sentiValue); })
        .attr("height", function(d) { return height - y(d.sentiValue); });