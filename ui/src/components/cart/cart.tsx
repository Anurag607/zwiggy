// import React from 'react'

// let a = 0
// interface CartProps {
//     item : {
//         name: string,
//         price: number,
//         qty: number
//     }
// }

// type foodItemType = {name: string, price: number, qty: number}

// const cartOp = (props: {item : foodItemType, count: number}) => {
//     const [cart, Setcart] = React.useState<{name: string, price: number, qty: number}[]>(JSON.parse(localStorage.getItem('cart') || '[]'))
//     const [finalCart, Setfinalcart] = React.useState<{name: string, price: number, qty: number}[]>(JSON.parse(localStorage.getItem('finalCart')|| '[]'))
    
//     React.useEffect(() => {
//         const currentCart = JSON.parse(localStorage.getItem('cart') || '[]')
//         const currentFinalCart = JSON.parse(localStorage.getItem('finalCart')|| '[]')
//         Setfinalcart([...cart, ...currentFinalCart])
//         localStorage.setItem("finalCart", JSON.stringify(finalCart))
//         UpdateCart(props.item)
//     }, [props.item])
    
//     const UpdateCart = (props: {item : foodItemType, count: number}) => {
//         console.log(a += 1)
//         // console.log(props.item)
    
//         const itemExist = cart.find(item => item.name === props.item.name)
    
//         if(!itemExist) {
//             Setcart([props.item, ...cart])
//             localStorage.setItem('cart', JSON.stringify(cart))
//             return
//         } else {
//             Setcart(currentCart => 
//                 currentCart.map((obj,i) => 
//                 (obj.name === props.item.name) ?
//                 { ...itemExist, name: props.item.name, price: props.item.price, qty: props.item.qty }
//                 : obj
//                 )
//             )
//             localStorage.setItem('cart', JSON.stringify(cart))
//         }
//         console.log(JSON.parse(localStorage.getItem("cart")!))
//         console.log(JSON.parse(localStorage.getItem("finalCart")!))
//     }
// }
