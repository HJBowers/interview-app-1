import express from 'express'
import * as questions from '../../database/queries/questions.js'
import * as utilities from '../../database/queries/utilities.js'

const router = express.Router()

router.get('/', (request, response) => {
  const {difficulty, topics} = request.query
  questions.findbyApproval(true)
  .then( questions => { response.json(questions) })
  .catch( err => console.log('err', err) )
})

router.get('/approved', (request, response) => {
  questions.findbyApproval(true)
  .then( questions => { response.json(questions) })
  .catch( err => console.log('err', err) )
})

router.get('/approval', (request, response) => {
  questions.findbyApproval(false)
  .then( questions => { response.json(questions) })
  .catch( err => console.log('err', err) )
})

router.delete('/approval/:id', (request, response) => {
  const { id } = request.params
  questions.deletebyID( id )
  .then( () => response.json( { 'message': 'deleted' } ) )
  .catch( err => console.log('err', err) )
})

router.post('/', (request, response) => {
  const attributes  = request.body
  if (!attributes.hints) {
    attributes.hints = []
  } else if(!attributes.topics) {
    attributes.topics = []
  }
  //TODO need to findOrCreate Topics if they don't exist;
  questions.create( attributes )
  .then( (question) => response.json( question ) )
  .catch( err => response.status(400).json({error: 'Could not create the question.', errorMsg: err.message, params: attributes}) )
})

router.put('/approval/:id', (request, response) => {
  const attributes = request.body
  questions.updatebyID( attributes )
  .then( questions => response.json(questions) )
  .catch( err => console.log('err', err) )
})

router.get('/:id', (request, response) => {
  const { id } = request.params
  const attributes = request.body
  questions.findbyID( id, attributes )
  .then( question => response.json( question ) )
  .catch( err => console.log('err', err) )
})

export default router
