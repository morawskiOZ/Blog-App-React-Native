import React, { useReducer } from 'react'

const createDataContext = < T extends {}>(reducer, actions, initialState) => {
  const Context = React.createContext<T>({} as T)

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)


    const boundAction = {}
    for (let key in actions) {
      boundAction[key] = actions[key](dispatch)
    }

    return (
      <Context.Provider value={{ state, ...boundAction }as any}>
        {children}
      </Context.Provider>
    )
  }
return {Context, Provider}
}

export default createDataContext
