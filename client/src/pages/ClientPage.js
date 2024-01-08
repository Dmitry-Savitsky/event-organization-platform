import React, { useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import { jwtDecode } from 'jwt-decode';
import { getAllOrders } from "../http/OrdersApi";
import ReviewForm from "../components/ReviewForm";

const ClientPage = () => {
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;
  const idClient = decodedToken.userid;

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getAllOrders();
        const clientOrders = ordersData.filter(order => order.idClients === idClient);
        setOrders(clientOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [idClient]);

  const handleLeaveComment = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div>
      <h2>Your Orders</h2>
      <ul>
        {orders.map(order => (
          <li
            key={order.idOrder}
            style={{
              listStyleType: 'none',
              marginBottom: '20px',
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: order.idExecutor === null ? 'red' : 'green',
              color: 'white', // Text color for better visibility
            }}
          >
            <strong>Order Comment:</strong> {order.OrderComment}<br />
            <strong>Start Date:</strong> {order.OrderStart}<br />
            <strong>End Date:</strong> {order.OrderEnd}<br />
            <strong>Order Address:</strong> {order.OrderAddress}<br />

            <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
              <strong>Service Details:</strong><br />
              <strong>Service Name:</strong> {order.Service.ServiceName}<br />
              <strong>Service Type:</strong> {order.Service.ServiceType}<br />
              <strong>Service Price:</strong> {order.Service.ServicePrice}<br />
              <img
                src={process.env.REACT_APP_API_URL + order.Service.img}
                alt={order.Service.ServiceName}
                className="img-fluid mt-4"
                style={{ borderRadius: '5px' }}
              /><br />
              <strong>Company Name:</strong> {order.Service.Company.CompanyName}<br />
              <strong>Company Phone:</strong> {order.Service.Company.CompanyPhone}<br />
            </div>

            {order.Executor && (
              <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
                <strong>Executor Details:</strong><br />
                <strong>Executor Name:</strong> {order.Executor.ExecutorName}<br />
                <strong>Executor Phone:</strong> {order.Executor.ExecutorPhone}<br />
                <strong>Executor Company Name:</strong> {order.Executor.Company.CompanyName}<br />
                <strong>Executor Company Phone:</strong> {order.Executor.Company.CompanyPhone}<br />
              </div>
            )}
            {order.idExecutor !== null && (
              <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
                <Button variant="primary" onClick={() => handleLeaveComment(order)}>
                  Leave Comment
                </Button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {selectedOrder && (
        <ReviewForm
          showReviewForm={true}
          handleReviewFormClose={() => setSelectedOrder(null)}
          clientId={idClient}
          orderId={selectedOrder.idOrder}
        />
      )}
    </div>
  );
};

export default ClientPage;
