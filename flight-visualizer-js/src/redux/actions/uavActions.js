export const ADD_UAV = 'ADD_UAV'
export const CHANGE_UAV_POSITION = 'CHANGE_UAV_POSITION'
export const SET_FILTER = 'SET_FILTER'

export const FILTER = {
  HIDE_ALL: 'HIDE_ALL',
  SHOW_ALL: 'SHOW_ALL'
}

export const addUAV = (data) => {
  return {
    type: ADD_UAV,
    payload: {
      id: data.id,
      position: data.position
    }
  }
}

export const changeUAVPosition = (data) => {
  return {
    type: CHANGE_UAV_POSITION,
    payload: {
      id: data.id,
      position: data.position
    }
  }
}

export const setFilter = (filter) => {
  return {
    type: SET_FILTER,
    payload: {
      filter: filter
    }
  }
}
