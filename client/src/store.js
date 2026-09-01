import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./redux/slices/TransactionSlice";


export const store = configureStore({
    reducer:{
        transaction:transactionReducer,
    }
})