import { createSlice } from "@reduxjs/toolkit";
const initialState = ''
const filterSlcie = createSlice({
    name:'filter',
    initialState,
    reducers:{
        setFilter(state,action){
            return action.payload
        }
    }
})
export const {setFilter} = filterSlcie.actions
export default filterSlcie.reducer