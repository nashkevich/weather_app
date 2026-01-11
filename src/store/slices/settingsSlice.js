import { createSlice } from '@reduxjs/toolkit';
import { TEMPERATURE_UNITS } from '../../utils/constants';

const initialState = {
  temperatureUnit: TEMPERATURE_UNITS.CELSIUS,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTemperatureUnit: (state, action) => {
      state.temperatureUnit = action.payload;
    },
    loadSettings: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setTemperatureUnit, loadSettings } = settingsSlice.actions;
export const selectTemperatureUnit = (state) => state.settings.temperatureUnit;
export default settingsSlice.reducer;
