/**
 * Created by huwenting on 3/29/16.
 */

function tooltipHtml(n, d){	/* function to create html content string in tooltip div. */
    return "<h4>"+n+"</h4><table>"+
        "<tr><td>Tweets/sec</td><td>"+(d.low)+"</td></tr>"+
        "</table>";
}

setTimeout(function() {
    var sampleData ={};
    console.log("data;")
    console.log(Data)
    console.log("data.find heatmap:")
    console.log(Data.find({type: "HeatMap"}).fetch())
    var newmapdata = Data.find({type: "HeatMap"}).fetch()[0]["heatmap"];
    var arr = $.map(newmapdata, function(o){return o.count;});
    var highest = Math.max.apply(Math,arr);
    console.log(arr);
    for (i = 0; i < newmapdata.length; i++) {
        var stateName = newmapdata[i]["state"];
        var stateCount = newmapdata[i]["count"];
        sampleData[stateName] = {low: stateCount, color: d3.interpolate("#FFB84C", "#FF1D02")(stateCount/ highest)};
    }


    /* draw states on id #statesvg */
    uStates.draw("#statesvg", sampleData, tooltipHtml);
}, 1000);


