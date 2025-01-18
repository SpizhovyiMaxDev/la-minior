import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";

const initialState = {
    cart:[],
    // cart: [
    //     {
    //         pizzaId: 12,
    //         name:"Hawaian",
    //         quantity: 2,
    //         unitPrice: 16,
    //         totalPrice: 32,
    //     },
    // ],
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addItem(state, action){
            state.cart.push(action.payload);
        },

        deleteItem(state, action){
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
        },

        increaseItemQuantity(state, action){
            const item = state.cart.find(item => item.pizzaId === action.payload);

            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },

        decreaseItemQuantity(state, action){
            const item = state.cart.find(item => item.pizzaId === action.payload);

            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice;
            
            if(item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
        },

        clearCart(state){
            state.cart = [];
        }
    }
});


export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


export const getTotalCartQuantity = (store) => store.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
export const getTotalCartPrice = (store) => store.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
export const getCurrentQuantityById = (pizzaId) => (store) => store.cart.cart.find(item => item.pizzaId === pizzaId)?.quantity ?? 0;
export const getCart = (store) => store.cart.cart;

// 'reselect'