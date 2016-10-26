import React from 'react'
import axios from 'axios'

class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPublication: this.props.currentPublication
    }
  }
  render() {
    let publication = this.state.currentPublication
    return (
      <div className='container'>
        <h3>{publication.title}</h3>
        <p>Author: {publication.author.join(', ')}</p>
        <p>Gene: {publication.gene.join(', ')}</p>
        <p>Publication date: {publication.pub_date}</p>
        <p>Publisher: {publication.publisher}</p>
        <p>Technique Group: {publication.technique_group.join(', ')}</p>
        <p>Figure Number: {publication.figure_number.join(', ')}</p>
      </div>
    )
  }
}

export default Item
