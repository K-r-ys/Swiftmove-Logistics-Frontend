import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../images/background.jpeg";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  padding-left: 2rem;
  min-height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  backdrop-filter: blur(10px);
`;

const ContentWrapper = styled.div`
  max-width: 50%;
  padding-top: 2rem;
  margin-top: 0;

  @media (max-width: 768px) {
    max-width: 90%;
    padding-top: 1rem;
  }
`;

const Heading = styled.h2`
  font-family: "Georgia", serif;
  font-size: 3rem;
  line-height: 1.2;
  color: white;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Paragraph = styled.p`
  font-family: "Georgia", serif;
  font-size: 1.5rem;
  line-height: 1.6;
  color: white;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  padding: 2rem;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: transform 0.3s, background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const PanelTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <ContentWrapper>
        <Heading>Experience Swiftmove Logistics</Heading>
        <Paragraph>
          Enjoy your free time while we deliver everything you need.
        </Paragraph>

        {/* Join as a Customer Button */}
        <JoinButton onClick={() => navigate("/getstarted")}>
          Join as a Customer
        </JoinButton>

        {/* Grid Panels */}
        <GridContainer>
          <Panel onClick={() => navigate("/customers/dashboard")}>
            <PanelTitle>Delivery Ordering</PanelTitle>
            Manage customer orders and deliveries.
          </Panel>

          <Panel onClick={() => navigate("/drivers/dashboard")}>
            <PanelTitle>Drivers</PanelTitle>
            See our registered drivers.
          </Panel>
        </GridContainer>
      </ContentWrapper>
    </Container>
  );
};

const JoinButton = styled.button`
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1664c0;
  }
`;

export default HomePage;
