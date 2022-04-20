widthS = 575;
// append the svg3 object to the body of the page
var svg3 = d3.select("#stockPrice")
.append("svg")
.attr("width", widthS)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/Xvois/Disney/main/DIS.csv",

// format variables:
function(d){
return { date : d3.timeParse("%Y-%m-%d")(d.Date), value : d.Close }
},

function(data) {

// Add X axis --> it is a date format
var x = d3.scaleTime()
  .domain(d3.extent(data, function(d) { return d.date; }))
  .range([ 0, widthS ]);
svg3.append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("opacity", 0)
  .call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
  .domain( [0, 150])
  .range([ height, 0 ]);
svg3.append("g")
  .attr("opacity", 0)
  .call(d3.axisLeft(y));

// Add the line
svg3.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("opacity", 0.5)
  .on('mouseover', function (d, i) {
    d3.select(this).transition()
            .duration('200')
            .attr('opacity', 1);
    })
    .on('mouseout', function (d, i) {
    d3.select(this).transition()
            .duration('200')
            .attr('opacity', 0.5);
    })
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return x(d.date) })
    .y(y(0))
  )
  .transition()
  .duration(4000)
  .attr("d", d3.line()
    .curve(d3.curveBasis) // Just add that to have a curve instead of segments
    .x(function(d) { return x(d.date) })
    .y(function(d) { return y(d.value) })
    )


})