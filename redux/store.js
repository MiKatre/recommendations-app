import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import {addQuestion} from './actions'

const store = createStore(reducer, applyMiddleware(thunk))

// store.dispatch(addQuestion({title: 'Is it moral to steal drugs if your child is dying?', id: '0'}))
// store.dispatch(addQuestion({title: 'Can i eat chocolate during pregnancy?', id: '1'}))
// store.dispatch(addQuestion({title: 'Si coche choca contra grupo de gitanos, habra daño grande para coche ?', id: '2'}))


// console.log(store.getState())

export default store



/*
{
  user: {
    token: iAmAToken,
    firstName: David,
    lastName: Malan,
  }
}
*/