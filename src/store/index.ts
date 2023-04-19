import { configureStore, createSlice, ThunkAction, Action, createAsyncThunk } from '@reduxjs/toolkit';
import { calcDistances } from '../api'

export interface TravelState {
  distances: string[][];
  loading: false | true;
  totalDistance: number | undefined;
  error: string | undefined;
};

const initialState: TravelState = {
  distances: [[]],
  totalDistance: undefined,
  loading: false,
  error: undefined,
};


export const calcTripDistances = createAsyncThunk(
  'cities/calcDistances',
  async (cities: string[]) => {
    const response = await calcDistances(cities);
    return response.data;
  }
);

export const tripSlice = createSlice({ 
  name: 'cities', 
  initialState, 
  reducers: {
    reset: () => {
      console.log('d')
      return initialState;
    }
  },
  extraReducers: builder => {
    builder.addCase(calcTripDistances.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    })
    .addCase(calcTripDistances.fulfilled, (state, action) => {
      state.loading = false;
      state.distances = action.payload[0];
      state.totalDistance = action.payload[1];
    })
    .addCase(calcTripDistances.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  }

});
export const selectTotalDistance = (state: RootState) => state.totalDistance;
export const selectTripDistances = (state: RootState) => state.distances;
export const selectLoading = (state: RootState) => state.loading;
export const selectError = (state: RootState) => state.error;
export const { reset } = tripSlice.actions;

const store = configureStore({ reducer: tripSlice.reducer });

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;