import express from 'express'
import * as questions from '../../database/queries/questions.js'
import * as utilities from '../../database/queries/utilities.js'

const router = express.Router()

<<<<<<< HEAD

router.get('/', (request, response) => {
  const {difficulty, topics} = request.params
  console.log('request.params >>>>', request.params)
  utilities.findAll('questions')
  .then( questions => {
    console.log('questions >>>>', questions)

      if(difficulty !== 'any') {
        questions = questions.filter( questions => !questions.difficulty )
      }
      if(topics !== 'any') {
        questions = questions.filter( questions => !questions.topics )
      }
      response.json(questions)
  })
=======
// router.get('/', (request, response) => {
//   const {difficulty, tags} = request.params
//   utilities.findAllWhere('questions', request.params, input)
//   .then( results => response.json( results ) )
//   .catch( err => console.log('err', err) )
// })

//tags is a string, we will probably need to split it?
router.get('/', (request, response) => {
  const {difficulty, tags} = request.params
  utilities.findAll('questions')
  .then( questions => {
    console.log('questions >>>>', questions)
    questions.filter( () => {
      if(request.params.difficulty === questions.difficulty) {
        console.log('yes it is difficult');
      }
      if(tags) {
        console.log('there are tags');
      }
      if(!difficulty && !tags){
        return
      }
      // questions => response.json(questions)
    }
  )
})
>>>>>>> bb6c5d289a6ae3ad2f5b8fecdb1f5632362012da
})


router.post('/questions', (request, response) => {
  const { attributes } = request.body
  questions.create(attributes)
  .then( () => response.json( {1: 'success'} ) )
  .catch( err => console.log('err', err) )
})

router.put('/:id', (request, response) => {
  const { id } = request.params
  const { attributes } = request.body
  questions.updatebyID( id, attributes )
  .then( () => response.json( { 1: 'success' } ) )
  .catch( err => console.log('err', err) )
})

router.put('/:level', (request, response) => {
  const { level } = request.params
  const { attributes } = request.body
  questions.updatebyID( level, attributes )
  .then( () => response.json( { 1: 'success' } ) )
  .catch( err => console.log('err', err) )
})

router.delete('/:id', (request, response) => {
  const { id } = request.params
  questions.deleteByID( id )
  .then( () => response.json( { 1: 'deleted' } ) )
  .catch( err => console.log('err', err) )
})

export default router
