import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "../services/noteService";
const initialState = {
  note: null,
  notes: [],
  loading: false,
  error: null,
  success: false,
};
export const addNote = createAsyncThunk("addNote", async (row, api) => {
  try {
    // console.log(api);

    const appData = api.getState();
    const { user } = appData.userSlice;
    // console.log(user);

    const config = {
      headers: {
        //"Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
        authorization: user.token,
      },
    };

    return await noteService.createNote(row, config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});
export const fetchNotes = createAsyncThunk("fetchNotes", async (_, api) => {
  try {
    // console.log(api);

    const appData = api.getState();
    const { user } = appData.userSlice;
    // console.log(user);

    const config = {
      headers: {
        // "Content-Type": "application/json",
        authorization: user.token,
      },
    };

    return await noteService.getNotes(config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});

export const editNote = createAsyncThunk("editNote", async (row, api) => {
  try {
    // console.log(api);

    const appData = api.getState();
    const { user } = appData.userSlice;
    // console.log(user);

    const config = {
      headers: {
        "Content-Type": "application/json",

        authorization: user.token,
      },
    };

    return await noteService.updateNote(row, config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});
export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNote.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(addNote.fulfilled, (state, action) => {
        (state.loading = false),
          (state.note = action.payload),
          (state.success = true),
          (state.error = null);
      })
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        (state.loading = false),
          (state.notes = action.payload),
          (state.success = true),
          (state.error = null);
      })

      .addCase(editNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(editNote.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(editNote.fulfilled, (state, action) => {
        (state.loading = false),
          (state.note = action.payload),
          (state.success = true),
          (state.error = null);
      });
  },
});
export default noteSlice.reducer;
