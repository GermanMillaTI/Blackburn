import { createSlice } from '@reduxjs/toolkit';

export const userInfo = createSlice({
    name: 'userInfo',
    initialState: {
        value: {},
        activeStats: false,
        activeDemoStats: false,
        activeLog: false
    },
    reducers: {
        updateUserInfo: (state, action) => {
            state.value = { ...action.payload }
        },
        isStatsActive: (state, action) => {
            state.activeStats = action.payload;
        },
        isDemoStatsActive: (state, action) => {
            state.activeDemoStats = action.payload;
        },
        isLogActive: (state, action) => {
            state.activeLog = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { updateUserInfo, isStatsActive, isDemoStatsActive } = userInfo.actions;

export default userInfo.reducer;