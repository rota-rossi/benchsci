import React from 'react'
import TopBar from './TopBar.jsx'
import {hashHistory, router} from 'react-router'
import axios from 'axios'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.searchGene = this.searchGene.bind(this)
    this.selectPublication = this.selectPublication.bind(this)
    this.state = {
      page: 1,
      currentPublication: {}
    }
  }
  componentDidMount() {
    this.searchGene(null, 1)
  }
  searchGene(query, page) {
    let url = query ? `/search?q=${query}&` : '/publications?'
    url += page ? `page=${page}` : 'page=1'
    axios.get(url)
      .then((response) => {
        this.setState({
          publications: response.data,
          page: page
        })
      })
      .catch((error) => {
        console.log('error: ' + error)
      })
    hashHistory.push('/items')
  }
  selectPublication(publication) {
    this.setState({
      currentPublication: publication
    })
  }
  render() {
    return (
      <div>
        <TopBar onFormSubmit={this.searchGene} />
        {this.props.children && React.cloneElement(this.props.children, {
              updatePublications: this.searchGene,
              selectPublication: this.selectPublication,
              publications: this.state.publications,
              page: this.state.page,
              currentPublication: this.state.currentPublication
            })}
      </div>
    )
  }
}

export default Main
