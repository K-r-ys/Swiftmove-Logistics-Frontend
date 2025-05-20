import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import backgroundImage from "../../images/background.jpeg";

import { useNavigate } from "react-router-dom";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Container = styled.div`
  min-height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  overflow: hidden;
`;

const ContentWrapper = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  padding: 3rem;
  border-radius: 16px;
  width: 80%;
  max-width: 1200px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
  text-align: center;
  animation: ${fadeIn} 1s ease;
  overflow: hidden;
  position: relative;
  max-height: 80vh;
  overflow-y: auto;
`;

const Heading = styled(motion.h2)`
  font-family: "Georgia", serif;
  font-size: 3rem;
  color: white;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem 1rem;
  margin: 1rem auto 2rem;
  border-radius: 12px;
  border: none;
  background: rgba(255, 255, 255, 0.25);
  color: white;
  font-family: "Georgia", serif;
  font-size: 1.1rem;
  outline: none;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px rgba(255, 165, 0, 0.5);
  transition: background 0.3s ease;
  &::placeholder {
    color: #ffd580;
  }
  &:focus {
    background: rgba(255, 255, 255, 0.4);
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  cursor: pointer;
  color: #ffffff;
  font-size: 1.2rem;
  transition: transform 0.3s ease, color 0.3s ease;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: "Georgia", serif;
  &:hover {
    transform: scale(1.1);
    color: #ffa500;
  }
`;

const OrderCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  text-align: left;
  box-shadow: 0 0 10px rgba(255, 165, 0, 0.2);
  font-family: "Georgia", serif;
  color: white;
`;

const OrderItem = styled.p`
  margin: 0.25rem 0;
  font-size: 1.05rem;
  strong {
    color: rgb(168, 226, 128);
  }
`;

const InfoText = styled.p`
  color: rgb(172, 125, 32);
  font-family: "Georgia", serif;
  font-size: 1.2rem;
  margin-top: 2rem;
`;

const OrderHistory = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/orders");
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrders(data);
        setFilteredOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredOrders(orders);
      return;
    }
    const lowerTerm = searchTerm.toLowerCase();
    const filtered = orders.filter(
      (order) =>
        order.pickup_location.toLowerCase().includes(lowerTerm) ||
        order.delivery_location.toLowerCase().includes(lowerTerm)
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  return (
    <Container>
      <ContentWrapper
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <BackButton onClick={() => navigate(-1)} aria-label="Go back">
          <FaArrowLeft />
          Back
        </BackButton>

        <Heading variants={fadeUp} initial="hidden" animate="visible">
          Order History
        </Heading>

        <SearchInput
          type="text"
          placeholder="Search by Pickup or Delivery Location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <InfoText>Loading orders...</InfoText>
          </motion.div>
        )}
        {error && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <InfoText>Error: {error}</InfoText>
          </motion.div>
        )}

        {!loading && !error && filteredOrders.length === 0 && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <InfoText>No orders found.</InfoText>
          </motion.div>
        )}

        {!loading &&
          !error &&
          filteredOrders.map((order, index) => (
            <motion.div
              key={order.order_id}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2 }}
            >
              <OrderCard>
                <OrderItem>
                  <strong>Order ID:</strong> {order.order_id}
                </OrderItem>
                <OrderItem>
                  <strong>Customer ID:</strong> {order.customer_id}
                </OrderItem>
                <OrderItem>
                  <strong>Pickup Location:</strong> {order.pickup_location}
                </OrderItem>
                <OrderItem>
                  <strong>Delivery Location:</strong> {order.delivery_location}
                </OrderItem>
                <OrderItem>
                  <strong>Package Details:</strong> {order.package_details}
                </OrderItem>
                <OrderItem>
                  <strong>Status:</strong> {order.status}
                </OrderItem>
                <OrderItem>
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.order_date).toLocaleDateString()}
                </OrderItem>
                <OrderItem>
                  <strong>Delivery Date:</strong>{" "}
                  {order.delivery_date
                    ? new Date(order.delivery_date).toLocaleDateString()
                    : "Pending"}
                </OrderItem>
              </OrderCard>
            </motion.div>
          ))}
      </ContentWrapper>
    </Container>
  );
};

export default OrderHistory;
