import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import raceService from "../services/raceService";
const initialState = {
  races: [],
  race: null,
  loading: false,
  error: null,
  success: false,
};
export const addRace = createAsyncThunk("addRace", async (row, api) => {
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

    return await raceService.createRace(row, config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});
export const fetchRaces = createAsyncThunk("fetchRaces", async (_, api) => {
  try {
    // console.log(api);

    const appData = api.getState();
    const { user } = appData.userSlice;
    //console.log(user.token);

    const config = {
      headers: {
        // "Content-Type": "application/json",
        authorization: user.token,
      },
    };

    return await raceService.getRaces(config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});
export const fetchRace = createAsyncThunk("fetchRace", async (id, api) => {
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

    return await raceService.getRace(id, config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});

export const removeRace = createAsyncThunk("removeRace", async (id, api) => {
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

    return await raceService.deleteRace(id, config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});
export const editRace = createAsyncThunk("editRace", async (row, api) => {
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

    return await raceService.updateRace(row, config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});
export const raceSlice = createSlice({
  name: "race",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRace.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRace.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(addRace.fulfilled, (state, action) => {
        (state.loading = false),
          (state.race = action.payload),
          (state.success = true),
          (state.error = null);
      })
      .addCase(fetchRaces.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRaces.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(fetchRaces.fulfilled, (state, action) => {
        (state.loading = false),
          (state.races = action.payload),
          (state.success = true),
          (state.error = null);
      })
      .addCase(fetchRace.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRace.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(fetchRace.fulfilled, (state, action) => {
        (state.loading = false),
          (state.race = action.payload),
          (state.success = true),
          (state.error = null);
      })
      .addCase(removeRace.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeRace.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(removeRace.fulfilled, (state, action) => {
        (state.loading = false),
          (state.race = action.payload),
          (state.success = true),
          (state.error = null);
      })
      .addCase(editRace.pending, (state) => {
        state.loading = true;
      })
      .addCase(editRace.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(editRace.fulfilled, (state, action) => {
        (state.loading = false),
          (state.race = action.payload),
          (state.success = true),
          (state.error = null);
      });
  },
});
export default raceSlice.reducer;
