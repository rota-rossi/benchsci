import React from 'react'
import {ListGroupItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'


class ListItem extends React.Component {
    constructor(props) {
      super(props)
      this.handleClick = this.handleClick.bind(this)
    }
    handleClick(event) {
      this.props.changeCurrentPublication(this.props.publication)
    }
    render() {
      return (
        <LinkContainer to='/item' >
          <ListGroupItem header={this.props.publication.title} id={this.props.publication._id} onClick={this.handleClick}>{this.props.publication.author.join(', ')}</ListGroupItem>
        </LinkContainer>
      )
    }
}

export default ListItem
