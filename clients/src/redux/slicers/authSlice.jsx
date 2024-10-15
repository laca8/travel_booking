import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import authService from '../service/authService'
const user = JSON.parse(localStorage.getItem('user'))
const initialState = {
    user:user? user : null,
    loading:false,
    error:null,
    success:false,
}
//create action
export const registerUser = createAsyncThunk('registerUser',async(user,thunkAPI)=>{
    try {
  
        return await authService.register(user)
        
    } catch (error) {
        console.log(error);        
        const msg = (error.response && error.response.data && error.response.data.message) || error.message ||error.toString()
        return thunkAPI.rejectWithValue(error.response.data.message)     
    }
})
export const logout = createAsyncThunk('logout',async()=>{
      return await authService.logout()
})
export const loginUser = createAsyncThunk('loginUser',async(user,thunkAPI)=>{
    try {
        return await authService.login(user)
    } catch (error) {
        console.log(error);        
        return thunkAPI.rejectWithValue(error.response.data.message)     
    }
})
export const userSlice  = createSlice({
    name:"users",
    initialState,
    reducers:{
        reset:(state)=>{
            state.loading = false,
            state.error = null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.loading = true
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = false,
            state.user = action.payload,
            state.success = true,
            state.error = null
 
            
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload
            
        })

        .addCase(loginUser.pending,(state)=>{
            state.loading = true
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false,
            state.user = action.payload,
            state.success = true,
            state.error = null
            
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload
            
        })
        .addCase(logout.fulfilled,(state)=>{
            state.loading = false,
            state.user = null,
            state.error = null
            
        })


    }
})
export const {reset} = userSlice.actions
export default userSlice.reducer