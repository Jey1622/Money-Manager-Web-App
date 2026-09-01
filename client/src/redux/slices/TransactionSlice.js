// import { createSlice } from "@reduxjs/toolkit";

// const transactionSlice = createSlice({
//   name: "transaction",
//   initialState: {
//     transactions: [],
//     loader: false,
//   },
//   reducers: {
//     setTransactions(state, action) {
//       return {
//         ...state,
//         transactions: action.payload,
//         loading: false,
//       };
//     },
//     setLoader(state, action) {
//       return {
//         ...state,
//         loader: action.payload,
//       };
//     },
//   },
// });

// const { actions, reducers } = transactionSlice;
// export default reducers;

// export const { setLoader, setTransactions } = actions;

import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transaction",

  initialState: {
    transactions: [],
    loader: false,
  },

  reducers: {
    setTransactions(state, action) {
      return {
        ...state,
        transactions: action.payload,
        loading: false,
      };
    },
    setLoader(state, action) {
      return {
        ...state,
        loader: true,
      };
    },
  },
});

export const { setTransactions, setLoader } = transactionSlice.actions;

export default transactionSlice.reducer;
