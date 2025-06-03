import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa"; // Using React Icons

import { useNavigate } from "react-router-dom";
const backgroundImage = "/images/background.jpeg";
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
  max-width: 800px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
  text-align: center;
  overflow: hidden;
  position: relative;
`;

const BackIcon = styled(FaArrowLeft)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  cursor: pointer;
  color: #ffffff;
  transition: transform 0.3s ease, color 0.3s ease;

  &:hover {
    transform: scale(1.1);
    color: #ffa500;
  }
`;

const SliderWrapper = styled.div`
  position: relative;
  margin-top: 2rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Slider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  background: #ffa500;
  height: 5px;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  margin-bottom: 1rem;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background: #ffffff;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const BreakLabels = styled.div`
  position: absolute;
  top: -25px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
`;

const Label = styled.span`
  color: #ffffff;
  font-size: 0.67rem;
`;

const IndicatorWrapper = styled.div`
  margin-top: 0.5rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.15);

  border-radius: 12px;
  color: #ffffff;
  font-size: 1rem;
  width: 100%;
  text-align: center;
`;

const PricingPage = () => {
  const [weight, setWeight] = useState(0);
  const pricingRates = [100, 150, 200, 250, 300, 350, 400, 450, 500, 550];

  const getPrice = (kg) => {
    if (kg === 0) return pricingRates[0];
    const index = Math.floor((kg - 1) / 10);
    return pricingRates[index] || pricingRates[pricingRates.length - 1];
  };

  const price = getPrice(weight);

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
        <BackIcon onClick={handleBackClick} />

        <motion.h2
          initial={{ y: -30, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          Pricing Calculator
        </motion.h2>

        <SliderWrapper
          as={motion.div}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 10,
            delay: 0.4,
          }}
        >
          <Slider
            type="range"
            min="0"
            max="100"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
          <BreakLabels>
            <Label>0 KG</Label>
            <Label>10 KG</Label>
            <Label>20 KG</Label>
            <Label>30 KG</Label>
            <Label>40 KG</Label>
            <Label>50 KG</Label>
            <Label>60 KG</Label>
            <Label>70 KG</Label>
            <Label>80 KG</Label>
            <Label>90 KG</Label>
            <Label>100 KG</Label>
          </BreakLabels>
          <IndicatorWrapper
            as={motion.div}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
          >
            Selected Weight: {weight} KG
          </IndicatorWrapper>
        </SliderWrapper>

        <SliderWrapper
          as={motion.div}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 10,
            delay: 0.8,
          }}
        >
          <Slider type="range" min="0" max="1000" value={price} readOnly />
          <IndicatorWrapper
            as={motion.div}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
          >
            Price: KES {price}
          </IndicatorWrapper>
        </SliderWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default PricingPage;
