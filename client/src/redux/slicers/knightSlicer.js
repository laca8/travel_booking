import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import knightService from "../services/knightService";
const initialState = {
  knight: null,
  loading: false,
  error: null,
  success: false,
};
export const addKnight = createAsyncThunk("addKnight", async (row, api) => {
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

    return await knightService.createKnight(row, config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});
export const fetchKnight = createAsyncThunk("fetchKnight", async (_, api) => {
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

    return await knightService.getKnight(config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});

export const removeKnight = createAsyncThunk("removeKnight", async (_, api) => {
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

    return await knightService.deleteKnight(config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});
export const editKnight = createAsyncThunk("editKnight", async (row, api) => {
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

    return await knightService.updateKnight(row, config);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(error?.response?.data?.message);
  }
});
export const knightSlice = createSlice({
  name: "knight",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addKnight.pending, (state) => {
        state.loading = true;
      })
      .addCase(addKnight.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(addKnight.fulfilled, (state, action) => {
        (state.loading = false),
          (state.knight = action.payload),
          (state.success = true),
          (state.error = null);
      })
      .addCase(fetchKnight.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchKnight.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(fetchKnight.fulfilled, (state, action) => {
        (state.loading = false),
          (state.knight = action.payload),
          (state.success = true),
          (state.error = null);
      })
      .addCase(removeKnight.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeKnight.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(removeKnight.fulfilled, (state, action) => {
        (state.loading = false),
          (state.knight = action.payload),
          (state.success = true),
          (state.error = null);
      })
      .addCase(editKnight.pending, (state) => {
        state.loading = true;
      })
      .addCase(editKnight.rejected, (state, action) => {
        (state.success = false),
          (state.loading = false),
          (state.error = action.payload);
      })
      .addCase(editKnight.fulfilled, (state, action) => {
        (state.loading = false),
          (state.knight = action.payload),
          (state.success = true),
          (state.error = null);
      });
  },
});
export default knightSlice.reducer;
