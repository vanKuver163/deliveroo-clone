import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect';

const initialState = {
  items: [],
}

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {      
        return { ...state, items: [...state.items, action.payload] };
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      let newBasket = [...state.items];
      if (index >=0)
      {
        newBasket.splice(index,1);
      }else{
        console.warn(
            `Cant remove product (id: ${action.payload.id}) as its not in basket`
        );
      }
     return { ...state, items: newBasket };
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})




export const { addToBasket, removeFromBasket } = basketSlice.actions

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsWithId = createSelector(
    [selectBasketItems, (_, id) => id],
    (basketItems, id) => basketItems.filter(item => item.id === id)
  );

export const selectBasketTotal = (state) => state.basket.items.reduce((total, item) => total += item.price, 0);

export default basketSlice.reducer;