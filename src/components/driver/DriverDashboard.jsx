import React from "react";
import styled from "styled-components";
import backgroundImage from "../../images/background.jpeg";

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

const DriverDashboard = () => {
  return (
    <Container>
      <Title>Driver Management</Title>
      <SubTitle>
        Track driver tasks, performance, and schedules effectively.
      </SubTitle>
      <Grid>
        <Card>
          <CardTitle>New Task</CardTitle>
          <CardText>Assign new tasks to drivers.</CardText>
        </Card>
        <Card>
          <CardTitle>Performance</CardTitle>
          <CardText>Monitor driver performance metrics.</CardText>
        </Card>
        <Card>
          <CardTitle>Task Support</CardTitle>
          <CardText>Get assistance for ongoing tasks.</CardText>
        </Card>
      </Grid>
    </Container>
  );
};

export default DriverDashboard;
