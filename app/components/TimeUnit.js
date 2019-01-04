import React, { Component } from 'react'
import './TimeUnit.css'

export default class TimeUnit extends Component {
  constructor () {
    super()
    this.state = {
      show: false,
      value: 0,
      minutes: false
    }
  }

  getValue () {
    let { value, minutes } = this.state
    value = (value === 24 || (minutes && value === 12)) ? 0 : value
    return Math.abs(value) * (minutes ? 5 : 1)
  }

  over () {
    this.setState({ show: true })
  }

  out () {
    this.setState({ show: false })
  }

  componentDidMount () {
    let { value, minutes } = this.props
    this.setState({ value, minutes })
  }

  componentWillReceiveProps (args) {
    this.setState({ minutes: args.minutes })
  }

  render () {
    let { value, show } = this.state
    let small = value > 12
    let radius = small ? 60 : 85
    let center = 125

    let angle = (Math.PI / 6) * value
    let x = center + Math.sin(angle) * radius
    let y = center - Math.cos(angle) * radius

    return (
      <g x='100' y='100' className={small ? 'small' : ''} onMouseOver={() => this.over()} onMouseOut={() => this.out()}>
        <circle cx={x} cy={y} r={small ? 12 : 13} fill={show ? 'red' : 'darkblue'}/>
        {show && <line x1={center} y1={center} x2={x} y2={y}/>}
        <text x={x} y={y} onClick={() => this.props.selectTime(this.getValue())}>
          {this.getValue()}
        </text>
      </g>
    )
  }
}
