import { configureStore } from '@reduxjs/toolkit'
import userWalletSlice from './wallet/wallet'
 const store = configureStore({
  reducer: {
    connect: userWalletSlice
  },
})

export default store;
