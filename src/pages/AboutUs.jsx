import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import backgroundImage from "../images/background.jpeg";
import { useNavigate } from "react-router-dom";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

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
  position: relative; /* To position the back button inside */
`;

const Heading = styled(motion.h2)`
  font-family: "Georgia", serif;
  font-size: 3rem;
  color: white;
  margin-bottom: 1rem;
`;

const Paragraph = styled(motion.p)`
  font-family: "Georgia", serif;
  font-size: 1.25rem;
  line-height: 1.6;
  color: #f0f0f0;
  margin-bottom: 1.5rem;
`;

const Highlight = styled(motion.span)`
  color: #ffa500;
  font-weight: bold;
`;

const BackButton = styled.button`
  position: absolute;
  top: 1rem;
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

const AboutUsPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <Container>
      <ContentWrapper
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <BackButton onClick={handleBackClick}>
          <FaArrowLeft />
        </BackButton>

        <Heading
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          About Swiftmove Logistics
        </Heading>

        <Paragraph
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          At <Highlight>Swiftmove Logistics</Highlight>, we believe in providing
          swift, reliable, and efficient delivery services that cater to your
          every need. Our mission is to streamline your logistics and keep your
          goods moving seamlessly from one destination to another.
        </Paragraph>

        <Paragraph
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          Whether it’s delivering a single package or managing large-scale
          transportation, we are dedicated to ensuring that each delivery is
          handled with care and delivered on time. Your trust fuels our drive to
          move faster and deliver better.
        </Paragraph>
      </ContentWrapper>
    </Container>
  );
};

export default AboutUsPage;
