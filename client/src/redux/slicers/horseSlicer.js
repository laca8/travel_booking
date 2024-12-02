import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import horseService from "../services/horseService";
const initialState = {
  horse: null,
  horses: [],
  loading: false,
  error: null,
  success: false,
};
export const addHorse = createAsyncThunk("addHorse", async (row, api) => {
  try {
    // console.log(api);

    const appData = api.getState();
    const { user } = appData.userSlice;
    // console.log(user);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        // "Content-Type": "application/json",
        authorization: user.token,
      },
    };

    return await horseService.createHorse(row, config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});
export const fetchHorse = createAsyncThunk("fetchHorse", async (_, api) => {
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

    return await horseService.getHorse(config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});

export const removeHorse = createAsyncThunk("removeHorse", async (id, api) => {
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

    return await horseService.deleteHorse(id, config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});
export const editHorse = createAsyncThunk("editHorse", async (row, api) => {
  try {
    // console.log(api);

    const appData = api.getState();
    const { user } = appData.userSlice;
    // console.log(user);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: user.token,
      },
    };

    return await horseService.updateHorse(row, config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});
export const horseSlice = createSlice({
  name: "horse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addHorse.pending, (state) => {
        state.loading = true;
      })
      .addCase(addHorse.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(addHorse.fulfilled, (state, action) => {
        (state.loading = false),
          (state.horse = action.payload),
          (state.success = true),
          (state.error = null);
      })
      .addCase(fetchHorse.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHorse.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(fetchHorse.fulfilled, (state, action) => {
        (state.loading = false),
          (state.horses = action.payload),
          (state.success = true),
          (state.error = null);
      })
      .addCase(removeHorse.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeHorse.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(removeHorse.fulfilled, (state, action) => {
        (state.loading = false),
          (state.horse = action.payload),
          (state.success = true),
          (state.error = null);
      })
      .addCase(editHorse.pending, (state) => {
        state.loading = true;
      })
      .addCase(editHorse.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(editHorse.fulfilled, (state, action) => {
        (state.loading = false),
          (state.horse = action.payload),
          (state.success = true),
          (state.error = null);
      });
  },
});
export default horseSlice.reducer;
