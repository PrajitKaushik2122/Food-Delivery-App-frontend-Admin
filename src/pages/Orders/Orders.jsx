import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.jpg";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/orders/all`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  const updateStatus = async (event, orderId) => {
    const newStatus = event.target.value;

    // 🔥 1. Instant UI update (fixes the dropdown not staying selected)
    setOrders(prev =>
      prev.map(o =>
        o.id === orderId ? { ...o, orderStatus: newStatus } : o
      )
    );

    // 🔥 2. Backend update
    try {
      const response = await fetch(
        `${BASE_URL}/api/orders/status/${orderId}?status=${newStatus}`,
        {
          method: "PATCH",
        }
      );

      // Optional: re-fetch for extreme accuracy
      if (response.ok || response.status === 201) {
        fetchOrders();
      }
    } catch (err) {
      console.error("Error updating order status", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 card">
          <table className="table table-responsive">
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>
                    <img src={logo} alt="" height={48} width={48} />
                  </td>

                  <td>
                    <div>
                      {order.orderItems.map((item, idx) => (
                        <b key={idx}>
                          {item.name} x {item.qty}
                          {idx !== order.orderItems.length - 1 && ", "}
                        </b>
                      ))}
                    </div>

                    <div>{order.userAddress}</div>
                  </td>

                  <td>₹ {order.amount}</td>
                  <td>Items: {order.orderItems.length}</td>

                  <td>
                    <select
                      className="form-control"
                      value={order.orderStatus}
                      onChange={(event) => updateStatus(event, order.id)}
                    >
                      <option value="Food Preparing">Food Preparing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
