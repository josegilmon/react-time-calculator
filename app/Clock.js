import React, { Component } from 'react'
import TimeUnit from './components/TimeUnit'
import moment from 'moment'

export default class Clock extends Component {
  constructor () {
    super()
    this.state = {
      hours: null,
      minutes: null,
      showMinutes: false,
      selectedTimes: [],
      tracks: []
    }
  }

  selectTime (value) {
    this.setState(prevState => ({
        ...prevState,
        hours: prevState.hours || value,
        minutes: prevState.hours ? value : prevState.minutes,
        showMinutes: !prevState.showMinutes
      }),
      () => {
        let { hours, minutes, selectedTimes } = this.state
        if (hours !== null && minutes !== null) {
          let diff
          let selectedTime = moment(`${hours}:${minutes}`, 'hh:mm')
          if (selectedTimes.length) {
            diff = selectedTime.diff(selectedTimes[0])
          }
          this.setState(prevState => ({
              ...prevState,
              hours: null,
              minutes: null,
              selectedTimes: [selectedTime].concat(prevState.selectedTimes),
              tracks: prevState.tracks.concat(diff ? moment.utc(diff).format('HH:mm') : [])
            })
          )
        }
      })
  }

  render () {
    let { showMinutes, tracks } = this.state
    let hours = new Array(showMinutes ? 12 : 24).fill(1)

    return (
      <div>
        <div>
          <svg id='clock' width='250px' height='250px'>
            <circle cx='125' cy='125' r='100' fill='darkblue'/>
            <g id='numbers'>
              {hours.map((h, i) => <TimeUnit key={hours.length - i} value={hours.length - i} minutes={showMinutes}
                                             selectTime={v => this.selectTime(v)}/>)}
            </g>
          </svg>
        </div>
        <div id='hours'/>
        <div id='minutes'/>
        <div id='times'>
          {tracks.map((t, i) => <div key={i}>{t}</div>)}
        </div>
      </div>
    )
  }
}
