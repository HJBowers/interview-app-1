import React, {Component} from 'react'
import {uniq, flatMap, take, shuffle} from 'lodash'

import Form from '../../molecules/form/index'
import Game from '../../pages/game/index'
import Request from '../../common/requests'

const inputModules = [
  {
    "type"    : "Select",
    "label"  : "Difficulty",
    "options" : ["any","beginner","intermediate"],
    "tag"     : "level",
    "isOptionRequired": true
  },
  {
    "type"    : "Select",
    "label"  : "Topic",
    "options" : [],
    "tag"     : "topic",
    "isOptionRequired": true
  }
  ,
  {
    "type"    : "Select",
    "label"  : "Game Mode",
    "options" : ['Questions & Answers', 'White Boarding', 'Debugging', 'Coding Challenge'],
    "tag"     : "game_mode",
    "isOptionRequired": true
  }
]

export default class GameOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {form: inputModules, isForm: true, questions: {}}
    this.getQuestions = this.getQuestions.bind(this)
    this.filterQuestions = this.filterQuestions.bind(this)
    this.state.form[1].options = ['any'].concat(this.props.topics)
  }

  componentDidMount() {
      Request.get('/api/questions/approved')
      .then(questions => {
        this.setState(Object.assign(this.state, {questions: questions}))
      })
    }

  getQuestions(filters) {
    const filteredQuestions = this.filterQuestions(this.state.questions, filters.topic, filters.level)
    this.setState(prevState => ({
      isForm: false,
      questions: filteredQuestions
    }))
  }

  filterQuestions(questions, topic, level) {
    let q = shuffle(questions)
    if(topic === 'any' && level === 'any') {
      return take(q, 7)
    } else if( topic === 'any') {
      return q.filter(question => question.level === level)
    } else if (level === 'any') {
      return q.filter(question => question.topics.includes(topic))
    } else {
      return q.filter(question => question.level === level && question.topics === topic)
    }
  }

  render() {
    const topics = this.props.topics || []
    const level = this.props.level || []
    const gameModes = this.props.gameModes || []
    let correctElement
    if (this.state.isForm) {
      correctElement = <div>
        <h4>Select your options</h4>
        <Form inputModules={inputModules}
              onSubmit={this.getQuestions.bind(this)}
              initialValue={{topic: 'any', level: 'any', game_mode: 'Questions & Answers'}}
              key='gameOptionForm'/>
        </div>
    }
    else if (!this.state.isForm) {
      correctElement = <Game questions={this.state.questions} />
    }
    return (
      <div>
        <h2>Mock Interview</h2>
        {correctElement}
      </div>
    )
  }
}
