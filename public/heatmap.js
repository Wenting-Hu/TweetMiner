/**
 * Created by huwenting on 3/29/16.
 */

function tooltipHtml(n, d){	/* function to create html content string in tooltip div. */
    return "<h4>"+n+"</h4><table>"+
        "<tr><td>Tweets/sec</td><td>"+(d.low)+"</td></tr>"+
        "</table>";
}



var sampleData ={};
var newmapdata = Data.find({type: "HeatMap"}).fetch()[0]["heatmap"];
//console.log(newmapdata);
for (i = 0; i < newmapdata.length; i++) {
    var stateName = newmapdata[i]["state"];
    var stateCount = newmapdata[i]["count"];
    sampleData[stateName] = {low: stateCount, color: d3.interpolate("white transparent transparent transparent", "#4eacff")(stateCount / 32)};
}

/* draw states on id #statesvg */
uStates.draw("#statesvg", sampleData, tooltipHtml);