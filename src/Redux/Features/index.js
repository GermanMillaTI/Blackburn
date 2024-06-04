import { createSlice } from '@reduxjs/toolkit';

export const userInfo = createSlice({
    name: 'userInfo',
    initialState: {
        value: {},
        activeStats: false,
        activeDemoStats: false,
        activeLog: false,
        showUpdateSession: '',
        showBookSession2: ''
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
        },
        setShowUpdateSession: (state, action) => {
            state.showUpdateSession = action.payload;
        },
        setShowBookSession2: (state, action) => {
            state.showBookSession2 = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { updateUserInfo, isStatsActive, isDemoStatsActive, setShowUpdateSession, setShowBookSession2 } = userInfo.actions;

export default userInfo.reducer;