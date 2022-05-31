import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    name: null,
    email: null,
    phone: null,
    role: null,
    address: null,
    avatar: null,
    created_at: null,
    updated_at: null,
};

// Cấu hình slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.phone = action.payload.phone;
        state.role = action.payload.role;
        state.address = action.payload.address;
        state.avatar = action.payload.avatar;
        state.created_at = action.payload.created_at;
        state.updated_at = action.payload.updated_at;
        console.log(action);
    },
  }
});

export const { updateUserInfo } = userSlice.actions;

export const selectUserInfo = state => state.user;

export default userSlice.reducer;