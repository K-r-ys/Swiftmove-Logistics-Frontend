import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import logisticsImage from "../images/image2.jpeg";
import backgroundImage from "../images/background.jpeg";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  backdrop-filter: blur(6px);
  overflow: hidden;
`;

const Popup = styled.div`
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  width: 90%;
  max-width: 900px;
  display: flex;
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease;
  position: relative;
  color: white;
  font-family: "Georgia", serif;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  background: url(${logisticsImage}) center center/cover no-repeat;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;

  @media (max-width: 768px) {
    height: 220px;
    border-radius: 16px 16px 0 0;
  }
`;

const RightColumn = styled.div`
  flex: 1;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BackButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.3rem;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #ffa500;
    transform: scale(1.1);
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  letter-spacing: 1px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 1rem;
`;

const Input = styled.input`
  padding: 0.85rem 1rem;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.18);
  color: #222;
  font-size: 1rem;
  outline: none;
  transition: background 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &::placeholder {
    color: #888;
    opacity: 1;
  }
`;

const Textarea = styled.textarea`
  padding: 0.85rem 1rem;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.18);
  color: #222;
  font-size: 1rem;
  outline: none;
  resize: vertical;
  min-height: 80px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &::placeholder {
    color: #888;
    opacity: 1;
  }
`;

const SubmitButton = styled.button`
  padding: 0.95rem 1rem;
  border-radius: 8px;
  border: none;
  background: #ffa500;
  color: #fff;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: background 0.2s;

  &:hover {
    background: #ff8800;
  }
`;

const NewOrder = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_id: "", // This can be auto-filled later
    driver_id: "", // Optional for now
    pickup_location: "",
    delivery_location: "",
    package_details: "",
    status: "Pending", // Default value
    order_date: "", // Could auto-fill with today’s date if needed
    delivery_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Order placed successfully!");
        setFormData({
          customer_id: "",
          driver_id: "",
          pickup_location: "",
          delivery_location: "",
          package_details: "",
          status: "Pending",
          order_date: "",
          delivery_date: "",
        });
      } else {
        alert("Failed to place order.");
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <Container>
      <Popup>
        <LeftColumn />
        <RightColumn>
          <BackButton onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </BackButton>
          <Title>Place New Delivery Order</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              type="number"
              name="customer_id"
              placeholder="Customer ID"
              value={formData.customer_id}
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              name="driver_id"
              placeholder="Driver ID (optional)"
              value={formData.driver_id}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="pickup_location"
              placeholder="Pickup Location"
              value={formData.pickup_location}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="delivery_location"
              placeholder="Delivery Location"
              value={formData.delivery_location}
              onChange={handleChange}
              required
            />
            <Textarea
              name="package_details"
              placeholder="Package Details"
              value={formData.package_details}
              onChange={handleChange}
              rows={4}
              required
            />
            <Input
              type="date"
              name="order_date"
              placeholder="Order Date"
              value={formData.order_date}
              onChange={handleChange}
              required
            />
            <Input
              type="date"
              name="delivery_date"
              placeholder="Delivery Date"
              value={formData.delivery_date}
              onChange={handleChange}
            />
            <SubmitButton type="submit">Submit Order</SubmitButton>
          </Form>
        </RightColumn>
      </Popup>
    </Container>
  );
};

export default NewOrder;
