import { applyMiddleware, compose, createStore } from 'redux'

import { socketMiddleware } from './middlewares'
import { uavReducer } from './reducers'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(uavReducer, composeEnhancer(applyMiddleware(socketMiddleware)))
