import { createStore, applyMiddleware  } from 'redux'
import reducer from './reducers/reducer.js'
import thunk from 'redux-thunk'

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)
window.store = store
export default store