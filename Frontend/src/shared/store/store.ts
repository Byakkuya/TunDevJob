import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer } from './reducers/auth'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
  }




  const rootReducer = combineReducers({
    auth: persistReducer(persistConfig, authReducer.reducer),
    
  })

 export const store = configureStore({
  reducer: {
    auth: rootReducer,
  },
})

export const persistor = persistStore(store)


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch