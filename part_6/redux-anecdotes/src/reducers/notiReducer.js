import { createSlice } from "@reduxjs/toolkit";
const initialState = ''
const notiSlice = createSlice({
    name:'notification',
    initialState,
    reducers:{
        setMessage(state,action){
            return action.payload
        },
        clearMessage(state,action){
            return ''
        }
    }
})

export const {setMessage, clearMessage} = notiSlice.actions
export default notiSlice.reducer