import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  });
}

/*
  CreateAsyncThunk produces three additional action types:
    - Pending state
    - Fulfilled state
    - Rejected state
*/

export const fetchAddress = createAsyncThunk("user/fetchAddress", async function () {
  try{
  const coordinates = await getPosition();
  const position = {
    latitude: coordinates.coords.latitude,
    longitude: coordinates.coords.longitude,
  };

  const address = await getAddress(position);
  const location = `${address?.locality}, ${address?.city} ${address?.postcode}, ${address?.countryName}`;

  return { position, location };
  } catch(err){
    throw err;
  }
});

const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading"; 
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.location;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message; 
      }),
});

export const { updateName } = userSlice.actions;
export default userSlice.reducer;

