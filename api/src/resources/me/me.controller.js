const service = require('./me.service')
const orderservice = require('../order/order.service')
const userservice = require ('../user/user.service')

const getCurrentOrders = async (req,res) => {
    try {
        //console.log(req.user)
        let[user, ] = await userservice.getUserById(req.user.user_id)
        user= JSON.parse(JSON.stringify(user))[0]
        //console.log(user)
        if(user.user_type === 'customer'){
            const[data, ] = await service.getCurrentOrders(req.user.user_id)
            
            if(data.length==0){
                return res.status(404).send({message:"data not found"})
            }
            
            for(let i=0;i<data.length;i++){
                let orderID=data[i].id
                const [newOrderitems,] =await orderservice.getOrderItemsById(orderID)
                //console.log(newOrderitems)
                data[i]["items"] = JSON.parse(JSON.stringify(newOrderitems))
            }

            return res.status(200).json(data)
        }
        else if(user.user_type === 'restaurant manag'){
            let [man, ] = await userservice.getRestaurantManagerById(user.id)
            //console.log(man)
            res_id=man[0].restaurant_id
            
            const[data, ] = await service.getCurrentRestaurantOrders(res_id) 
            //console.log(data)
            if(data.length==0){
                return res.status(404).send({message:"data not found"})
            }

            for(let i=0;i<data.length;i++){
                let orderID=data[i].id
                const [newOrderitems,] =await orderservice.getOrderItemsById(orderID)
                //console.log(newOrderitems)
                data[i]["items"] = JSON.parse(JSON.stringify(newOrderitems))
            }

            return res.status(200).json(data)
        }
        else if(user.user_type ==='delivery man'){
            //console.log(req.user.user_id)
            const[data,] = await service.getCurrentDeliveryManOrders(req.user.user_id)
            
            if(data.length==0){
                return res.status(404).send({message:"data not found"})
            }

            for(let i=0;i<data.length;i++){
                let orderID=data[i].id
                const [newOrderitems,] =await orderservice.getOrderItemsById(orderID)
                //console.log(newOrderitems)
                data[i]["items"] = JSON.parse(JSON.stringify(newOrderitems))
            }

            return res.status(200).json(data)
        }

        return res.status(400).json({message:"invalid user type"})
    }
        
    catch(err){
        res.status(500).send({error:err})
    }
}
module.exports = {
    getCurrentOrders
}