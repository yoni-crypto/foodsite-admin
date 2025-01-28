import React, { useEffect, useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets.js";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      // console.log(response.data.data)
    } else {
      toast.error("Error");
    }
  };

  const deleteOrderHandler = async (orderId) => {
    try {
        const response = await axios.post(url+"/api/order/delete", { orderId });
        if (response.data.success) {
            toast.success("Order deleted");
            fetchAllOrders();  
        } else {
            toast.error("Error deleting order");
        }
    } catch (error) {
        console.error("Error deleting order:", error);
        toast.error("Error");
    }
};
  const statushandler=async(event,orderId)=>{
    const response=await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value

    })
    if (response.data.success){
      await fetchAllOrders()
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order page</h3>
      {orders.length===0?(
        <p className="no-orders">No Orders</p>
      ):(
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity+", ";
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName+" "+order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street+", "}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items :{order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event)=>statushandler(event,order._id)} value={order.status} >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            <img onClick={()=>deleteOrderHandler(order._id)} src={assets.delete_icon} alt="" style={{width:"30px"}}/>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default Orders;
