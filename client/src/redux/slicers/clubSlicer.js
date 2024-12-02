import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clubService from "../services/clubService";
const initialState = {
  club: null,
  loading: false,
  error: null,
  success: false,
};
export const addClub = createAsyncThunk("addClub", async (row, api) => {
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

    return await clubService.createClub(row, config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});
export const fetchClub = createAsyncThunk("fetchClub", async (_, api) => {
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

    return await clubService.getClub(config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});

export const removeClub = createAsyncThunk("removeClub", async (_, api) => {
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

    return await clubService.deleteClub(config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});
export const editClub = createAsyncThunk("editClub", async (row, api) => {
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

    return await clubService.updateClub(row, config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});
export const clubSlice = createSlice({
  name: "club",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addClub.pending, (state) => {
        state.loading = true;
      })
      .addCase(addClub.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(addClub.fulfilled, (state, action) => {
        (state.loading = false),
          (state.club = action.payload),
          (state.success = true),
          (state.error = null);
      })
      .addCase(fetchClub.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClub.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(fetchClub.fulfilled, (state, action) => {
        (state.loading = false),
          (state.club = action.payload),
          (state.success = true),
          (state.error = null);
      })
      .addCase(removeClub.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeClub.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(removeClub.fulfilled, (state, action) => {
        (state.loading = false),
          (state.club = action.payload),
          (state.success = true),
          (state.error = null);
      })
      .addCase(editClub.pending, (state) => {
        state.loading = true;
      })
      .addCase(editClub.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(editClub.fulfilled, (state, action) => {
        (state.loading = false),
          (state.club = action.payload),
          (state.success = true),
          (state.error = null);
      });
  },
});
export default clubSlice.reducer;
