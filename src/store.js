// 상태를 보관해주는 store
import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: 'user',
  initialState: 'kim',
  reducers: {
    changeName(state) {
      return 'john ' + state
    },
    // dkanrjsk() {

    // }
  }
})

export let { changeName } = user.actions

let cart = createSlice({
  name: 'shoes',
  initialState: [
    {
      id: 0, 
      name: 'White and Black', 
      count: 2
    },
    { 
      id: 1, 
      name: 'Grey Yordan', 
      count: 1
    },
  ],
  reducers: {
    addCount(state) {
      // let copy = [...state];
      // console.log(copy[0].count);
      // copy[0].count++;
      // console.log(copy[0].count);
      // console.log(copy[0]);
      // let id = clicked.payload.id;
      // let copy = state[id].count;
      // console.log(copy);
      // return copy;
    }
  }
})

export let { addCount } = cart.actions;

export default configureStore({
  reducer: {
    // 위에 저장한 변수를 여기에 등록을 해야함
    // 작명 : 위의 변수.reducer
    user: user.reducer,
    cart: cart.reducer,
  }
})
