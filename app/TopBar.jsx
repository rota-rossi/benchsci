import React from 'react'
import {Navbar, Nav, NavItem, FormGroup, FormControl, Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {Link, hashHistory} from 'react-router'

class TopBar extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.cleanQuery = this.cleanQuery.bind(this)
    this.state = {q: ''}
  }
  handleChange(event) {
   this.setState({q: event.target.value});
  }
  handleSubmit(ev) {
    ev.preventDefault()
    this.props.onFormSubmit(this.state.q, 1)
  }
  cleanQuery(ev) {
    this.setState({q: ''})
    this.props.onFormSubmit(null, 1)
  }
  render () {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Link to='/' onClick={this.cleanQuery}>
            <Navbar.Brand>BenchSci Search for Gene</Navbar.Brand>
          </Link>
        </Navbar.Header>
        <Nav>
          <LinkContainer to='/chart'>
            <NavItem>Chart</NavItem>
          </LinkContainer>
        </Nav>
        <Navbar.Form pullRight>
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <FormControl type='text' name='q' placeholder='Search' value={this.state.q} onChange={this.handleChange} />
            </FormGroup>
            <Button type='submit'>Submit</Button>
          </form>
        </Navbar.Form>
      </Navbar>
    )
  }
}

export default TopBar
