import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import backgroundImage from "../../images/background.jpeg";
import sampleDriver from "../../images/image4.jpeg";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${backgroundImage});
  background-size: cover;
  background-position: center;
  padding: 2rem;
  position: relative;
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

const GridWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 4rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  justify-content: center;
`;

const Card = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  padding: 1.2rem;
  text-align: center;
  color: #fff;
  cursor: pointer;
  transition: transform 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-4px);
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

const DriverImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
`;

const DriverName = styled.h4`
  margin: 0.5rem 0 0.2rem;
  font-size: 1.1rem;
  font-weight: bold;
`;

const DriverInfo = styled.p`
  font-size: 0.85rem;
`;

const sampleDrivers = [
  { name: "Alex Mwangi", info: "Deliveries | Nairobi" },
  { name: "Brian Otieno", info: "Long Haul | Mombasa" },
  { name: "Carol Njeri", info: "Courier | Kisumu" },
  { name: "David Kiptoo", info: "Passenger | Eldoret" },
  { name: "Eunice Wanjiku", info: "Logistics | Thika" },
  { name: "Felix Mutua", info: "Bulk Transport | Nakuru" },
];

const DriverDashboard = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Container>
      <BackButton onClick={handleBackClick}>
        <FaArrowLeft />
      </BackButton>
      <GridWrapper>
        <Grid>
          {sampleDrivers.map((driver, index) => (
            <Card
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <DriverImage src={sampleDriver} alt={driver.name} />
              <DriverName>{driver.name}</DriverName>
              <DriverInfo>{driver.info}</DriverInfo>
            </Card>
          ))}
        </Grid>
      </GridWrapper>
    </Container>
  );
};

export default DriverDashboard;
