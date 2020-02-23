const socketMiddleware = () => {
  return (next) => {
    return (action) => {
      // Do some check for action type
      // Socket emit something
      const returnedValue = next(action)
      return returnedValue
    }
  }
}

export default socketMiddleware
