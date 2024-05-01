import { configureStore } from '@reduxjs/toolkit'
import  listReducer  from "./slice/list"

export const store = configureStore({
    reducer: {
      list:listReducer
  },
})