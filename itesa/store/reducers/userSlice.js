// import { createAction, createReducer } from "@reduxjs/toolkit";

// //Definimos las acciones que puede tener este estado
// export const userLogin = createAction("LOGIN");
// export const userLogOut = createAction("LOGOUT");

// const initialState = {
//   id:"",
//   nick_name: "",
//   email: "",
// };

// //combinamos todas las acciones en un reducer
// //ver que usamos la nueva sintaxis con "builder" "https://redux-toolkit.js.org/api/createReducer"

// const userReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(userLogin, (state, action) => {
//       return action.payload;
//     })
//     .addCase(userLogOut, (state, action) => {
//       return initialState;
//     });
// });

// export default userReducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  nick_name: "",
  email: "",
  viral_code: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state = action.payload;
      return state;
    },
    logout: (state, action) => {
      state = initialState;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
