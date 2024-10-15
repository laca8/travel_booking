import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import notesReportervice from '../service/notesReportService'
const initialState = {
    notes:[],
    note:null,
    error:null,
    loading:false,
    success:false
}
//create actions
export const fetchNotes = createAsyncThunk('getNotes',async(id,thunkAPI)=>{
    try {
        return await notesReportervice.getNotes(id)
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)     
    }
})
export const addNote = createAsyncThunk('addNote',async(n,thunkAPI)=>{
    try {
        return await notesReportervice.ctreatNote(n)
        
    } catch (error) {
        console.log(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data.message)  

    }
})

export const noteReportSlice = createSlice({
    name:'note',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchNotes.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchNotes.fulfilled,(state,action)=>{
            state.loading = false,
            state.notes = action.payload
        })
        .addCase(fetchNotes.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload
        })
        .addCase(addNote.pending,(state)=>{
            state.loading = true
        })
        .addCase(addNote.fulfilled,(state,action)=>{
            state.loading = false,
            state.note = action.payload
        })
        .addCase(addNote.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload
        })
      

    }

})
export default noteReportSlice.reducer