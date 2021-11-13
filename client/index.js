const axios = require('axios');

// GET ALL CART PRODUCTS: get - http://localhost:3004/cart
  // ITERATE CART PRODUCTS WITH FOREACH
    // CHECK CART PRODUCT EXISTS IN PRODUCTS: get - http://localhost:3004/products/:id
       // IF EXISTS UPDATE TO SOLD:TRUE IN CART PRODUCTS: patch - http://localhost:3004/cart/:id { sold: true }

axios.get('http://localhost:3004/cart')
    .then(res => {
        const cartProducts = res.data;
        
        cartProducts.forEach(cartProduct => {
            const { id, productID } = cartProduct;

            axios.get(`http://localhost:3004/products/${productID}`)
                .then(res => {
                    if(res.data.hasOwnProperty('id')){
                        
                        axios.patch(`http://localhost:3004/cart/${id}`, { sold: true }) // for testing purpose changes it to false to true, true to false
                         .then(res => console.log(`cart product upadted with id ${id} to sold:true`))
                         .catch(err => console.log(`Error Product with id ${id} not Updated`, err.message))

                    } else {
                        throw new Error(`Product not found with id ${productID}`);
                    }
                })
                .catch(err => console.log(`Product not found with id ${productID} in cart`, err.message))
        });
    })
    .catch(err => console.log('Error while getting cart items,', err.message))



// ASYNC AWAIT SOLUTION
// const updateCartProductsToSold = async () => {
//     try {
//         const { data: cartProducts } = await axios.get('http://localhost:3004/cart');
    
//         cartProducts.forEach(async cartProduct => {
//             const { id, productID } = cartProduct;
    
//             try {
//                 const { data: product } = await axios.get(`http://localhost:3004/products/${productID}`);
        
//                 if(product.hasOwnProperty('id')){
//                     try {
//                         await axios.patch(`http://localhost:3004/cart/${id}`, { sold: true }); // for testing purpose changes it to false to true, true to false
//                         console.log(`cart product upadted with id ${id} to sold:true`)
//                     } catch(err) {
//                         console.log(`Error Product with id ${id} not Updated`, err.message);
//                     }
//                 } else {
                     
//                 }
//             } catch(err) {
//                 console.log(`Product not found with id ${productID}`, err.message)
//             }
//         });
//     } catch(err) {
//         console.log('Error while getting cart items,', err.message)
//     }
// }

// updateCartProductsToSold()