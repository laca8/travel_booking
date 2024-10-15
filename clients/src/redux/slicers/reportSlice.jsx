import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import reportService from '../service/reportService'
const initialState = {
    reports:[],
    report:null,
    error:null,
    loading:false,
    success:false
}
//create actions
export const fetchReports = createAsyncThunk('getReports',async(keywords,thunkAPI)=>{
    try {
        return await reportService.getReports(keywords)
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)     
    }
})
export const editReport = createAsyncThunk('updateReport',async(r,thunkAPI)=>{
    try {
        return await reportService.updateReport(r)

    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.message)  
      
           
        
    }

})
export const addReport = createAsyncThunk('addReport',async(r,thunkAPI)=>{
    try {
  
        return await reportService.createReport(r)
        
    } catch (error) {
        console.log(error);        
        return thunkAPI.rejectWithValue(error.response.data.message)     
    }
})
export const fetchReport = createAsyncThunk('getReport',async(id,thunkAPI)=>{
    try {
        return await reportService.getReportById(id)
        
    } catch (error) {
       console.log(error);

      return thunkAPI.rejectWithValue(error.response.data.message)     
    
    }
})
export const reportSlice = createSlice({
    name:'report',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchReports.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchReports.fulfilled,(state,action)=>{
            state.loading = false,
            state.reports = action.payload

        })
        .addCase(fetchReports.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload

        })
        .addCase(editReport.pending,(state)=>{
            state.loading=true
        })
        .addCase(editReport.fulfilled,(state,action)=>{
            state.loading=false,
            state.report=action.payload,
            console.log(action);
            
        })
        .addCase(editReport.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
        .addCase(fetchReport.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchReport.fulfilled,(state,action)=>{
            state.loading = false,
            state.report = action.payload

        })
        .addCase(fetchReport.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload

        })
        .addCase(addReport.pending,(state)=>{
            state.loading = true
        })
        .addCase(addReport.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload
            
        })
        .addCase(addReport.fulfilled,(state,action)=>{
            state.loading = false,
            state.report = action.payload,
            state.success = true,
            state.error = null
            
        })
      

    }

})
export default reportSlice.reducer