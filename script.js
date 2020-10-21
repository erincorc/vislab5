const margin = {top: 20, right: 10, bottom: 20, left: 10};
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// CHART INIT -----------------------
let svg = d3.select('.chart').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


// CREATE SCALES WITHOUT DOMAINS

const xScale = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1)
   
const yScale = d3.scaleLinear()
    .range([height, 20])

const xAxis = d3.axisBottom()
    .scale(xScale)

const yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(10) 
    
// call x axis
svg.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);
    
    // call y axis 
svg.append("g")
    .attr("class", "axis y-axis")
    .call(yAxis);

svg.append("text")
    .attr("class", "y-axis-label")
    .attr('x', 20)
    .attr('y', 10)
    .text("Number of Stores")

svg.append("text")
    .attr('x', 850)
    .attr('y', 420)
    .text("Chain Names")



let type = document.querySelector('#group-by option.value');

const colorScale = d3.scaleOrdinal(d3.schemeTableau10)

// UPDATE FUNCTION
function update(d, type) {
    console.log('in here')
    //type = document.querySelector('#group-by').value
    console.log('type ', type)
    const names = d.map(d => d.company)
    console.log(names)
    console.log(d[type])
    xScale.domain(names)
    yScale.domain([0, d3.max(d => d[type])])

    if (type == 'stores') {

        console.log('in stores')

        

        const rectangles = svg.selectAll('.bars')
            .data(d)
            .enter() 
            .append('rect')
            .attr('x', d => xScale(d.company))
            .attr('y', d => yScale(d[type]))
            .attr('height', d => height - yScale(d[type]))
            .attr('width', xScale.bandwidth())
            .attr('fill', d => colorScale(d.company))

            xAxis.scale(xScale)

            yAxis.scale(yScale)

            // update axis titles
    }
  
    else { // type == 'revenue
        console.log('in revenue')
        const rectangles = svg.selectAll('.bars')
            .data(d)
            .enter()
            .append('rect')
            .attr('x', d => xScale(d.company))
            .attr('y', d => yScale(d[type]))
            .attr('height', d => height - yScale(d[type]))
            .attr('width', xScale.bandwidth())
            .attr('fill', d => colorScale(d.company))

            xAxis.scale(xScale)

            yAxis.scale(yScale)

            // update axis titles
    };


    // Implement the enter-update-exist sequence

    // Update axes and axis title

};

let coffee = d3.csv('coffee-house-chains.csv', d3.autoType).then(d => {
    update(d, type)
    });
