import { useEffect, useState } from "react";
import "./Admin.scss";

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  const correctPassword = "rikakuma123"; // set your access password here

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch("/.netlify/functions/get-orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, [isLoggedIn]);

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsLoggedIn(true);
    } else {
      alert("Incorrect password.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <h2>Client Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h1>Orders Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Tracking</th>
            <th>Label</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="7">No orders yet.</td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.order_id}</td>
                <td>{order.customer_name}</td>
                <td>{order.customer_email}</td>
                <td>
                  <a
                    href={order.tracking_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Track
                  </a>
                </td>
                <td>
                  <a
                    href={order.label_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </td>
                <td>${order.total_amount}</td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;