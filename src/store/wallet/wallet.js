import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isReferesh: false,
}

export const userWalletSlice = createSlice({
  name: 'userWallet',
  initialState,
  reducers: {
    refreshBalance: (state, action) => {
      state.isReferesh = action.payload;
    }
  }
})

export const { refreshBalance } = userWalletSlice.actions
export default userWalletSlice.reducer