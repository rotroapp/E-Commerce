
export const addDecimal = (num) => (Math.round(num*100)/100).toFixed(2);


export const updatecart = (state) => {

            //calculate items price
        state.itemsPrice = state.cartItems.reduce((acc,item) => acc + Number(item.price)*Number(item.qty),0)
            //calculate shipping price (if above 200 it will be free delivery else rs30)
        state.shippinPrice = addDecimal(state.itemsPrice > 200 ? 0 : 30)
            
        //calculate tax rate tax (18% gst)
        state.taxPrice = addDecimal(Number(0.18 * state.itemsPrice).toFixed(2))
         //calculate total price

         state.totalPrice = (
            Number(state.itemsPrice)+
            Number(state.shippinPrice)+
            Number(state.taxPrice)
         ).toFixed(2)

         localStorage.setItem("cart",JSON.stringify(state));
         
}


