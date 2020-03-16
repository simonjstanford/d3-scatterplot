window.addEventListener('load', e => {
    let width = 500;
    let height = 500;
    let padding = 30;

    let xExtent = d3.extent(regionData, d => d.adultLiteracyRate);
    let yExtent = d3.extent(regionData, d => d.subscribersPer100);
    let urbanPopulationRateExtent = d3.extent(regionData, d => d.urbanPopulationRate);
    let medianAgeExtent = d3.extent(regionData, d => d.medianAge);
    
    console.log(urbanPopulationRateExtent);

    let yScale = d3.scaleLinear()
                   .domain(yExtent)
                   .range([height - padding, padding]);

    let xScale = d3.scaleLinear()
                   .domain(xExtent)
                   .range([padding, width - padding]);

    let urbanPopulationRateScale = d3.scaleLinear()
                                     .domain(urbanPopulationRateExtent)
                                     .range([5, 30]);

    let medianAgeScale = d3.scaleLinear()
                            .domain(medianAgeExtent)
                            .range(["green", "blue"]);

    let xAxis = d3.axisBottom(xScale)
                  .tickSize(-height + 2 * padding)
                  .tickSizeOuter(0);

    let yAxis = d3.axisLeft(yScale)
                  .tickSize(-width + 2 * padding)
                  .tickSizeOuter(0);

    d3.select("svg")
      .append("g")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis);

    d3.select("svg")
      .append("g")
        .attr("transform", "translate("+ padding + ",0)")
        .call(yAxis);

    d3.select("svg")
      .append("text")
      .attr("x", width /2)
      .attr("y", height - padding)
      .attr("dy", "1.5em")
      .style("text-anchor", "middle")
      .text("Adult Literacy Rate");

    d3.select("svg")
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height /2)
      .attr("y", padding)
      .attr("dy", "-1.1em")
      .style("text-anchor", "middle")
      .text("Cell Phone Subscribers per 100");
    
      d3.select("svg")
        .attr("width", width)
        .attr("height", height)
      .selectAll("circle")
      .data(regionData)
      .enter()
      .append("circle")
        .attr("cx", d => xScale(d.adultLiteracyRate))
        .attr("cy", d => yScale(d.subscribersPer100))
        .attr("r", d => urbanPopulationRateScale(d.urbanPopulationRate))
        .attr("fill", d => medianAgeScale(d.medianAge))
        .attr("stroke", "black")
        .attr("stroke-width", 1);
});