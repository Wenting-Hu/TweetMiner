/**
 * Created by huwenting on 2/24/16.
 */



var svg = d3.select("#speedometer")
    .append("svg:svg")
    .attr("width", 400)
    .attr("height", 400);


var gauge = iopctrl.arcslider()
    .radius(160)
    .events(false)
    .indicator(iopctrl.defaultGaugeIndicator);
gauge.axis().orient("in")
    .normalize(true)
    .ticks(7)
    .tickSubdivide(3)
    .tickSize(10, 8, 10)
    .tickPadding(5)
    .scale(d3.scale.linear()
        .domain([0, 7000])
        .range([-3*Math.PI/4, 3*Math.PI/4]));

var segDisplay = iopctrl.segdisplay()
    .width(110)
    .digitCount(4)
    .negative(false)
    .decimals(0);

svg.append("g")
    .attr("class", "segdisplay")
    .attr("transform", "translate(150, 250)")
    .call(segDisplay);

svg.append("g")
    .attr("class", "gauge")
    .call(gauge);

setInterval(update, 1000);

function update() {
    segDisplay.value(Data.find({type: "traffic"}).fetch()[0]["traffic"]);<!-- this is Tweets Per Second ------------------------------------------------------- -->
    gauge.value(Data.find({type: "traffic"}).fetch()[0]["traffic"]);
}
