const margin = {top: 20, right: 10, bottom: 20, left: 10};
const width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

let coffee = d3.csv('coffee-house-chains.csv', d3.autoType).then(d => {
    console.log(d)


// CREATE SVG WITH MARGIN CONVENTION

let svg = d3.select('.chart').append('svg')
        .attr('width', width)
        .attr('height', height)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

let names = d.map(d => d.company)
let stor = d.map(d => d.stores)
let rev = d.map(d => d.revenue)

// CREATE SCALES

const xScale = d3.scaleBand()
    .domain(names)
    .rangeRound([0, width])
    .paddingInner(0.1)

const yScale = d3.scaleLinear()
    .domain(stor).nice()
    .range([height, 20])

// CREATE BARS
let rects = d3.selectAll('.bar')
    .data(d, function(d) {return d.company})
    .enter()
    .append('rect')
    .attr('x', (d => xScale(d.company)))
    .attr('y',  height)
    .attr('width', xScale.bandwidth())
    .attr('height', height)
    .attr('fill', 'blue')

// CREATE AXES AND AXIS TITLES

const xAxis = d3.axisBottom()
    .scale(xScale)

const yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(10)

    // call x axis
    svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)
    
    // call y axis 
    svg.append("g")
        .attr("class", "axis y-axis")
        .call(yAxis);

});