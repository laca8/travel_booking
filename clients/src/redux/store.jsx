import {configureStore} from '@reduxjs/toolkit'
import UserSlicer from './slicers/authSlice'
import reportSlice from './slicers/reportSlice'
import  noteReportSlice  from './slicers/notesReportSlicer'
import suggSlice from './slicers/suggSlice'
import noteSuggSlice from './slicers/noteSuggSlice'
const store = configureStore({
    reducer:{
      users:UserSlicer,
      report:reportSlice,
      noteReport:noteReportSlice,
      suggestion:suggSlice,
      noteSugg:noteSuggSlice
    }
})
export default store