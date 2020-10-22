// CHART INIT ------------------------------

// create svg with margin convention
const margin = ({top: 20, right: 35, bottom: 20, left: 40});
const width = 700 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;


const svg = d3.select('.chart').append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let type = d3.select('#group-by').node().value;

// create scales without domains

const xScale = d3.scaleBand()
   // .domain(d.map(d => d.company))
    .rangeRound([0, width])
    .paddingInner(0.1)
   
const yScale = d3.scaleLinear()
  //  .domain([0, d3.max(d, d => d.stores)])
    .range([height, 0])

// create axes and axis title containers
const xAxis = d3.axisBottom()
    .scale(xScale)

const yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(10)

 svg.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis)

svg.append("g")
    .attr("class", "axis y-axis")
    .call(yAxis)



// (Later) Define update parameters: measure type, sorting direction

var dataKey = function(d) {
    return d.company;
}

// sort direction (1 = low to high)
let direction = -1

const colors = d3.scaleOrdinal(d3.schemeAccent)

// CHART UPDATE FUNCTION -------------------
function update(data, type){
   
    if (type == 'stores') {
        data.sort((a,b) => (a.stores - b.stores)*direction)
    }
    else {
        data.sort((a,b) => (a.revenue - b.revenue)*direction)
    }
   
    // update domains
    console.log('data = ', data)
    console.log('in update')

    // Change the measure dynamically: 
    //  d[type] where type is either "stores" or "revenue"

    // add sorting direction

    xScale.domain(data.map(d => dataKey(d)))
    //console.log(data.map(d => dataKey(d)))

    if (type == 'stores') {
        yScale.domain([0,d3.max(data, d => d.stores)]);
        console.log(d3.max(data, d => d.stores))

        const bars = svg.selectAll('rect')
            .data(data, dataKey);
        // enter & update bars

        bars.enter()
            .append('rect')
            .merge(bars)
            .transition()
            .duration(1000)
            .attr('x', d => xScale(d.company))
            .attr('y', d => yScale(d.stores))
            .attr('width', xScale.bandwidth())
            .attr('height', d => height - yScale(d.stores))
            .style('fill', d => colors(d.company));

        // exit
        bars.exit()
            .transition()
            .duration(1000)
            .remove()

        svg.select('.x-axis')
            .transition()
            .duration(1000)
            .call(xAxis)

        svg.select('.y-axis')
            .transition()
            .duration(1000)
            .call(yAxis) 
    }

    else { // if type = revenue
        console.log('data',data)
        
        console.log('data2',data)

        yScale.domain([0, d3.max(data, d => d.revenue)]);

        const bars = svg.selectAll('rect')
            .data(data, dataKey);
        // enter & update bars
        bars.enter()                
            .append('rect')
            .merge(bars)            
            .transition()
            .duration(1000)
            .attr('x', d => xScale(d.company))
            .attr('y', d => yScale(d.revenue))
            .attr('width', xScale.bandwidth())
            .attr('height', d => height - yScale(d.revenue))
            .style('fill', d=>colors(d.company));

        // exit
        bars.exit()
            .transition()
            .duration(1000)
            .remove();

        svg.select('.x-axis')
            .transition()
            .duration(1000)
            .call(xAxis)

        svg.select('.y-axis')
            .transition()
            .duration(1000)
            .call(yAxis) 
    }
        svg.select('.y-axis-label')
            .remove()

        // update axes and axis title
        svg.append("text")
           // .transition()
           // .duration(1000)
            .attr("class", "y-axis-label")
            .attr('x', 20)
            .attr('y', 10)
            .text(function() {
                if (type == 'stores') {
                    return "Number of Stores Worldwide"
                }
                else {
                    return "Revenue in Billions of US Dollars"
                }
            })
};



// Loading data
d3.csv('coffee-house-chains.csv', d3.autoType).then(data => {
    updatedData = data;
    console.log(updatedData)
	update(data, type); // simply call the update function with the supplied data
});



// make an event listener
// (Later) Handling the type change
function typeChange(event) {
    type = event.target.value
    update(updatedData, type)
};

// (Later) Handling the sorting direction change
function sortDirection(event) {
    direction = direction * -1
    update(updatedData, type)
};

document.querySelector('#group-by').addEventListener('change', typeChange)
document.querySelector('#sortbutton').addEventListener('click', sortDirection)