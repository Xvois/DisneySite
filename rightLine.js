
// append the svg2 object to the body of the page
var svg2 = d3.select("#rightLine")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/Xvois/Disney/main/DisneyMoviesPerAnnum.csv",

  //format variables:
  function(d){
    return { year : d3.timeParse("%Y")(d.year), movies : d.movies }
  },

  function(data) {

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.year; }))
      .range([ 0, width ]);
    svg2.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("opacity", 0)
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.movies; })])
      .range([ height, 0 ]);
    svg2.append("g")
    .attr("opacity", 0)
      .call(d3.axisRight(y));

    // Add the area
    svg2.append("path")
      .datum(data)
      .attr("fill", "white")
      .attr("opacity", 0.5)
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("d", d3.area()
        .curve(d3.curveBasis)
        .x(function (d) {return x(d.year)})
        .y0(y(0))
        .y1(y(0))
      )
      .transition()
      .duration(5000)
      .attr("d", d3.area()
      .curve(d3.curveBasis)
        .x(function(d) { return x(d.year) })
        .y0(y(0))
        .y1(function(d) { return y(d.movies) })
        )

})
