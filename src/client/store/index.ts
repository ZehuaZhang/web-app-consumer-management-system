import { Store, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { State, reducer } from '../reducers'

export function configureStore(initialState?: State): Store<State> {
  let middleware = applyMiddleware(
    thunkMiddleware,
    createLogger
  )

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware)
  }

  const store = createStore(reducer, initialState, middleware) as Store<State>

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
