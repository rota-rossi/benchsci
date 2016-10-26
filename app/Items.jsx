import React from 'react'
import axios from 'axios'
import ListItem from './ListItem.jsx'
import {Pagination, ListGroup} from 'react-bootstrap'
// import {LinkContainer} from 'react-router-bootstrap'

class Items extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      publications: {totalItems: 0, queryString: '', results: []},
      activePage: 1
    }
    this.handlePagination = this.handlePagination.bind(this)
  }
  // componentDidMount() {
  //   this.handlePagination(1)
  // }
  componentWillReceiveProps(nextProps) {
    this.setState({
      publications: nextProps.publications,
      activePage: nextProps.page
    })
  }
  handlePagination(eventKey) {
    let queryString = this.state.publications.queryString
    this.props.updatePublications(queryString, eventKey)
    this.setState({
      activePage: eventKey
    })
    // this.props.updatePublications(null, eventKey, (result) => {
    //   this.setState({
    //     activePage: eventKey
    //   })
    //   // this.setState({
    //   //   activePage: eventKey,
    //   //   publications: result.data
    //   // })
    // })
  }
  render() {
    return (
      <div className='container'>
        <h3>{this.state.publications.queryString ? `Search for ${this.state.publications.queryString}` : 'All Items'}</h3>
        <p>Total Results: {this.state.publications.totalItems}</p>
        <Pagination
         prev
         next
         first
         last
         ellipsis
         boundaryLinks
         items={Math.ceil(this.state.publications.totalItems / 20.0)}
         maxButtons={5}
         activePage={this.state.activePage}
         onSelect={this.handlePagination} />
       <ListGroup>
         { this.state.publications.results.map((publication, key) => {
           return (
             <ListItem publication={publication} key={key} changeCurrentPublication={this.props.selectPublication} />
           )
         })}
       </ListGroup>
     </div>
    )
  }
}

export default Items
