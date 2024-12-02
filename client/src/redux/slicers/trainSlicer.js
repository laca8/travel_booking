import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import trainService from "../services/trainService";
const initialState = {
  trains: [],
  train: null,
  loading: false,
  error: null,
  success: false,
};
export const addTrain = createAsyncThunk("addTrain", async (row, api) => {
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

    return await trainService.createTrain(row, config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});
export const fetchTrains = createAsyncThunk(
  "fetchTrains",
  async (keyword, api) => {
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

      return await trainService.getTrains(keyword, config);
    } catch (error) {
      // console.log(error);
      return api.rejectWithValue(error?.response?.data?.message);
    }
  }
);
export const fetchTrain = createAsyncThunk("fetchTrain", async (id, api) => {
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

    return await trainService.getTrain(id, config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});

export const removeTrain = createAsyncThunk("removeTrain", async (id, api) => {
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

    return await trainService.deleteTrain(id, config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});
export const editTrain = createAsyncThunk("editTrain", async (row, api) => {
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

    return await trainService.updateTrain(row, config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});
export const trainSlice = createSlice({
  name: "train",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTrain.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTrain.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(addTrain.fulfilled, (state, action) => {
        (state.loading = false),
          (state.train = action.payload),
          (state.success = true),
          (state.error = null);
      })
      .addCase(fetchTrains.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrains.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(fetchTrains.fulfilled, (state, action) => {
        (state.loading = false),
          (state.trains = action.payload),
          (state.success = true),
          (state.error = null);
      })
      .addCase(fetchTrain.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrain.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(fetchTrain.fulfilled, (state, action) => {
        (state.loading = false),
          (state.train = action.payload),
          (state.success = true),
          (state.error = null);
      })
      .addCase(removeTrain.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeTrain.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(removeTrain.fulfilled, (state, action) => {
        (state.loading = false),
          (state.train = action.payload),
          (state.success = true),
          (state.error = null);
      })
      .addCase(editTrain.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTrain.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(editTrain.fulfilled, (state, action) => {
        (state.loading = false),
          (state.train = action.payload),
          (state.success = true),
          (state.error = null);
      });
  },
});
export default trainSlice.reducer;
