const margin = {top: 20, right: 10, bottom: 20, left: 10};
const width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

let coffee = d3.csv('coffee-house-chains.csv', d3.autoType).then(d => {
    console.log(d)

    let svg = d3.select('.chart').append('svg')
        .attr('width', width)
        .attr('height', height)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

let names = data.map(d => d.company)
let stor = data.map(d => d.stores)
let rev = data.map(d => d.revenue)

const xScale = d3.scaleBand()
    .domain(names)
    .rangeRound([0, width])
    .paddingInner(0.1)
});