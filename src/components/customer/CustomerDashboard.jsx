import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
const backgroundImage = "/images/background.jpeg";
const Container = styled.div`
  min-height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #fff;
`;

const BackButton = styled.button`
  position: absolute;
  top: 5rem;
  left: 1rem;
  cursor: pointer;
  color: #ffffff;
  font-size: 1rem;
  transition: transform 0.3s ease, color 0.3s ease;
  background: transparent;
  border: none;
  &:hover {
    transform: scale(1.1);
    color: #ffa500;
  }
`;

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const SubTitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 600px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-5px);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const CardText = styled.p`
  font-size: 1rem;
`;

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Container>
      <BackButton onClick={handleBackClick}>
        <FaArrowLeft />
      </BackButton>
      <Title>Delivery Management</Title>
      <SubTitle>
        Manage, track, and update all your delivery orders efficiently.
      </SubTitle>
      <Grid>
        <Card
          onClick={() => navigate("/new-order")}
          style={{ cursor: "pointer" }}
        >
          <CardTitle>New Order</CardTitle>
          <CardText>Place a new delivery order with ease.</CardText>
        </Card>

        <Card
          onClick={() => navigate("/order-history")}
          style={{ cursor: "pointer" }}
        >
          <CardTitle>Order History</CardTitle>
          <CardText>View all your past orders and track status.</CardText>
        </Card>

        <Card
          onClick={() => navigate("/order-support")}
          style={{ cursor: "pointer" }}
        >
          <CardTitle>Order Support</CardTitle>
          <CardText>Need help? Get in touch with our support team.</CardText>
        </Card>
      </Grid>
    </Container>
  );
};

export default CustomerDashboard;
