import { createStore } from 'redux'
import { uavReducer } from './reducers'

export default createStore(
  uavReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
