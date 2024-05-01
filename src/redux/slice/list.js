import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchJobList = createAsyncThunk(
  'jobs/fetchJobList', // Action type prefix
  async (_, thunkAPI) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({
        "limit": 10,
        "offset": 0
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw
      };

      const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);

      if (!response.ok) {
        throw new Error('Failed to fetch job list');
      }

      const data = await response.json();
      console.log("data", data)
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  value: 0,
  status: 'idle',
  data: null,
  error: null,
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchJobList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default listSlice.reducer;
