import React from 'react'
import * as d3 from 'd3'
import axios from 'axios'

class Graph extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.drawGraph(this.props.publications.queryString)
  }
  componentDidUpdate() {
   this.drawGraph(this.props.publications.queryString);
 }

  drawGraph(query) {
    let url='/graph?q='+query
    console.log(url)
      axios.get(url)
        .then((response) => {
          console.log(response)
          var data=response.data
          var x = d3.scaleLinear()
              .domain([0, d3.max(data, function(d) {return d.count})])
              .range([0, 800]);

          d3.select(".chart")
            .selectAll("div")
            .data(data)
            .enter().append("div")
              .style("width", function(d) { return x(d.count) + "px"; })
              .text(function(d) { return `${d._id}: ${d.count}` });
        })
        .catch((error) => {
          console.log('error: ' + error)
        })
  }

  // componentDidMount() {
  //   var url='http://localhost:3000/graph?q='+this.props.publications.queryString
  //   axios.get(url)
  //     .then((response) => {
  //       var data=response
  //       var x = d3.scaleLinear()
  //           .domain([0, d3.max(data, function(d) {return d.value})])
  //           .range([0, 420]);
  //
  //       d3.select(".chart")
  //         .selectAll("div")
  //         .data(data)
  //         .enter().append("div")
  //           .style("width", function(d) { return x(d.value) + "px"; })
  //           .text(function(d) { return d._id; });
  //     })
  //     .catch((error) => {
  //       console.log('error: ' + error)
  //     })
  // }

  render() {
    console.log(this.props)
    return(
      <div className='container'>
        <h3>Graph</h3>
        <div className='chart'></div>
      </div>
    )
  }
}

export default Graph
