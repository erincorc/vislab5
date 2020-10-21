const margin = {top: 20, right: 10, bottom: 20, left: 10};
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

let coffee = d3.csv('coffee-house-chains.csv', d3.autoType).then(d => {
    console.log(d)


// CREATE SVG WITH MARGIN CONVENTION

let svg = d3.select('.chart').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


// CREATE SCALES

const xScale = d3.scaleBand()
    .domain(d.map(d => d.company))
    .rangeRound([0, width])
    .paddingInner(0.1)
   
const yScale = d3.scaleLinear()
    .domain([0, d3.max(d, d => d.stores)])
    .range([height, 20])


let rectangles = svg.selectAll('.bars')
    .data(d)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.company))
    .attr('y', d => yScale(d.stores))
    .attr('height', d => height - yScale(d.stores))
    .attr('width', xScale.bandwidth())
    .attr('fill', 'pink')
    

/*
// CREATE BARS
let bars = svg.selectAll('rect')
    .data(d)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.company))
    .attr('y', yScale(d.stores))
    .attr('width', xScale.bandwidth())
    .attr('height', d => height - yScale(d.stores))
    .attr('fill', 'blue')
*/
// CREATE AXES AND AXIS TITLES

let xAxis = d3.axisBottom()
    .scale(xScale)

let yAxis = d3.axisLeft()
    .scale(yScale)
    .tickValues(yScale.ticks().concat(yScale.domain()))

    // call x axis
svg.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis)
    
    // call y axis 
svg.append("g")
    .attr("class", "axis y-axis")
    .call(yAxis)

svg.append("text")
    .attr("class", "y-axis-label")
    .attr('x', 25)
    .attr('y', 10)
    .text("Number of Stores")

svg.append("text")
    .attr('x', 850)
    .attr('y', 420)
    .text("Chain Names");
    
});