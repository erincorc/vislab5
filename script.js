let coffeeData;

const margin = ({top: 20, right: 10, bottom: 20, left: 10})
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// CHART INIT -----------------------
let svg = d3.select('.chart').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// CREATE SCALES WITHOUT DOMAINS

const xScale = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1)
   
const yScale = d3.scaleLinear()
    .range([height, 0])

// CREATE AXES

const xAxis = d3.axisBottom()
    .scale(xScale)

const yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(10)
    
// DISPLAY X AXIS AND ADD LABEL
svg.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

    // call y axis 
svg.append("g")
    .attr("class", "axis y-axis")
    .call(yAxis);

svg.append("text") // add x axis label - won't change 
    .attr('x', 850)
    .attr('y', 420)
    .text("Chain Names");


//let type = d3.select('#group-by').node().value

const colorScale = d3.scaleOrdinal(d3.schemeTableau10)

// CHART UPDATES ---------------------------**

let dataKey = function(d) {
    return d.company
}

function update(data) {

    console.log('in update function')
    console.log('d = ', data)
    console.log('dataKey(d) = ', dataKey(data))


    xScale.domain(data.map(d => dataKey(d)))
    yScale.domain([0, d3.max(data, d => d.stores)])

    //console.log(d[type])
    
    console.log(xScale)
    console.log(xScale.bandwidth())

    xAxis.scale(xScale)

    yAxis.scale(yScale)

    const bars = svg.selectAll('.bar')
        .data(d);

    // enter - update - exit sequence

    bars.enter()
        .append('rect')
        .merge(bars)
        .transition()
        .duration(1000)
        .attr('class', 'bars')
        .attr('x', d => xScale(d.company))
        .attr('y', d => yScale(d.stores))
        .attr('height', d => height - yScale(d.stores))
        .attr('width', xScale.bandwidth())
        .attr('fill', 'blue')

 

            // update  y axis title
    svg.append("text")
        .attr('class', 'y-axis-label')
        .attr('x', 20)
        .attr('y', 10)
        .text("Number of Stores")


    // now do enter, update, exit
   /* if (type == 'stores') {

        console.log('in stores')


        bars.enter() 
            .append('rect')
            .merge(bars)
            .attr('class', 'rects')
            .attr('x', d => xScale(d.company))
            .attr('y', d => yScale(d[type]))
            .attr('height', d => height - yScale(d[type]))
            .attr('width', xScale.bandwidth())
            .attr('fill', d => colorScale(d.company))

            xAxis.scale(xScale)

            yAxis.scale(yScale)

            // update y axis title
            let yTitle = svg.append("text")
                            .attr('class', 'y-axis-label')
                            .attr('x', 20)
                            .attr('y', 10)
                            .text("Number of Stores")
    }
  
    else { // type == 'revenue
        console.log('in revenue')
        bars.enter()
            .append('rect')
            .attr('x', d => xScale(d.company))
            .attr('y', d => yScale(d[type]))
            .attr('height', d => height - yScale(d[type]))
            .attr('width', xScale.bandwidth())
            .attr('fill', d => colorScale(d.company))

            xAxis.scale(xScale)

            yAxis.scale(yScale)

            // update  y axis title
            let yTitle = svg.append("text")
                            .attr('class', 'y-axis-label')
                            .attr('x', 20)
                            .attr('y', 10)
                            .text("Revenue of Stores")
            
    }; */
   
};



// Loading data

d3.csv('coffee-house-chains.csv', d3.autoType).then(d => {
        //coffeeData = d;
        //console.log(coffeeData);
        update(d) //simply call the update function with the supplied data
    });

// handling type change

/*function typeChange(event) {
    type = event.target.value
    update(d, type)
};

//document.querySelector('#group-by').addEventListener('change', typeChange);

// handling sorting direction change */