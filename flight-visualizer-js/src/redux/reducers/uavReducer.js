import { ADD_UAV, CHANGE_POSITION, FILTER, SET_FILTER } from '../actions/uavActions'
const { SHOW_ALL } = FILTER

// UI states
/*
{
  filter: SHOW_ALL
  uavs: [
    { id: 1, position: { lat:  51.505, lon: -0.09 } }
    { id: 2, position: { lat:  52.505, lon: -1.09 } }
  ]
}
 */

const filter = (state = SHOW_ALL, action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.payload.filter
    default:
      return state
  }
}

const uavs = (uavs = {}, action) => {
  switch (action.type) {
    case ADD_UAV:
      return { ...uavs, [action.payload.id]: { position: action.payload.position } }
    case CHANGE_POSITION:
      return { ...uavs, [action.payload.id]: { position: action.payload.position } }
    default:
      return uavs
  }
}

const uavReducer = (state = {}, action) => {
  return {
    filter: filter(state.filter, action),
    uavs: uavs(state.uavs, action)
  }
}

export default uavReducer
