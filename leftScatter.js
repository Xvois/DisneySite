
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 0, bottom: 30, left: 0},
        width = 1435 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#leftScatter")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    
    //Read the data
    d3.csv("https://raw.githubusercontent.com/duncandam86/DataCamp-Projects/master/Disney%20Movies%20and%20Box%20Office%20Success/datasets/disney_movies_total_gross.csv",

    // format variables:
    function(d){
        return { date : d3.timeParse("%Y-%m-%d")(d.release_date), gross : d.inflation_adjusted_gross }
    },

    function(data){
        console.log(data[5].date)


        // Add X axis
  var x = d3.scaleTime()
    .domain([0, 0])
    .range([ 0, width ]);
  svg.append("g")
    .attr("class", "myXaxis")   // Note that here we give a class to the X axis, to be able to call it later and modify it
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .attr("opacity", "0")


        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, 1500000000])
            .range([ height, 0]);
        svg.append("g")
            .attr("opacity", 0)
            .call(d3.axisLeft(y));

        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.date); } )
            .attr("cy", function (d) { return y(d.gross); } )
            .attr("r", 2)
            .attr("opacity", 0.7)
            .style("fill", "black")



        // new X axis
        x.domain(d3.extent(data, function(d) { return d.date; }))
    svg.select(".myXaxis")
        .transition()
        .duration(3000)
        .attr("opacity", "1")
        .call(d3.axisBottom(x));

        svg.selectAll("circle")
    .transition()
    .delay(function(d,i){return(i*3)})
    .duration(3000)
    .attr("cx", function (d) { return x(d.date); } )
    .attr("cy", function (d) { return y(d.gross); } )
})