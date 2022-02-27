import { configureStore } from '@reduxjs/toolkit'
import anecdotesReducer from './reducers/anecdoteReducer'
import fitlerReducer from './reducers/fitlerReducer'
import notiReducer from './reducers/notiReducer'
export const store = configureStore({
    reducer:{
        anecdotes: anecdotesReducer,
        notification: notiReducer,
        filter: fitlerReducer
    }
})