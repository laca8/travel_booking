import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import suggsService from '../service/suggsService'
const initialState = {
    suggs:[],
    sugg:null,
    error:null,
    loading:false,
    success:false
}
//create actions
export const fetchSuggs = createAsyncThunk('getSuggs',async(keywords,thunkAPI)=>{
    try {
        return await suggsService.getSuggs(keywords)
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)     
    }
})
export const editSugg = createAsyncThunk('updateSugg',async(r,thunkAPI)=>{
    try {
        return await suggsService.updateSugg(r)

    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.message)  
      
           
        
    }

})
export const addSugg = createAsyncThunk('addSugg',async(r,thunkAPI)=>{
    try {
  
        return await suggsService.createSugg(r)
        
    } catch (error) {
        console.log(error);        
        const message = (error.response && error.response.data && error.response.data.message) || error.message ||error.toString()
        return thunkAPI.rejectWithValue(error.response.data.message)     
    }
})
export const fetchSugg = createAsyncThunk('getSugg',async(id,thunkAPI)=>{
    try {
        return await suggsService.getSuggById(id)
        
    } catch (error) {
       console.log(error);

      return thunkAPI.rejectWithValue(error.response.data.message)     
    
    }
})
export const suggSlice = createSlice({
    name:'sugg',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchSuggs.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchSuggs.fulfilled,(state,action)=>{
            state.loading = false,
            state.suggs = action.payload

        })
        .addCase(fetchSuggs.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload

        })
        .addCase(editSugg.pending,(state)=>{
            state.loading=true
        })
        .addCase(editSugg.fulfilled,(state,action)=>{
            state.loading=false,
            state.sugg=action.payload,
            console.log(action);
            
        })
        .addCase(editSugg.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
        .addCase(fetchSugg.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchSugg.fulfilled,(state,action)=>{
            state.loading = false,
            state.sugg = action.payload

        })
        .addCase(fetchSugg.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload

        })
        .addCase(addSugg.pending,(state)=>{
            state.loading = true
        })
        
        .addCase(addSugg.fulfilled,(state,action)=>{
            state.loading = false,
            state.sugg = action.payload,
            state.error = null
        })
        .addCase(addSugg.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload,
            console.log(action)

            
        })
      

    }

})
export default suggSlice.reducer