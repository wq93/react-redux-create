import React, {Component} from 'react'
import PropTypes from 'prop-types';

class Page extends Component {
  static childContextTypes = {
    name: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      name: 'wq'
    }
  }

  getChildContext() {
    return this.state
  }

  render() {
    return (
      <div>
        我是{this.state.name}
        <OutWrapper></OutWrapper>
      </div>
    )
  }
}

class OutWrapper extends Component {
  render() {

    return (
      <>
        <p>我是OutWrapper</p>
        <InnerWrapper></InnerWrapper>
      </>
    )
  }
}

class InnerWrapper extends Component {
  static contextTypes = {
    name: PropTypes.string
  }

  render() {
    console.log()
    return (
      <div>{this.context.name}</div>
    )
  }
}

export default Page