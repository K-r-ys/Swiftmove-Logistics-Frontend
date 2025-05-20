import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import logisticsImage from "../images/image3.jpeg";
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  margin-bottom: 1.25rem;
  border: 1.5px solid rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  font-family: "Georgia", serif;
  transition: border-color 0.3s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
    font-style: italic;
  }

  &:focus {
    outline: none;
    border-color: #ffa500;
    background: rgba(255, 255, 255, 0.3);
  }
`;

const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  color: white;
  display: flex;
  align-items: center;

  a {
    margin-left: 0.25rem;
    color: #ffa500;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const CheckboxInput = styled.input`
  margin-right: 0.5rem;
`;

const SubmitButton = styled.button`
  background-color: #ffa500;
  color: black;
  font-weight: bold;
  padding: 1rem;
  border: none;
  border-radius: 16px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.3s;

  &:hover {
    background-color: #e59400;
    transform: scale(1.05);
  }
`;

const GetStarted = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Welcome, ${formData.fullName}! Registration successful.`);
        setFormData({
          name: "",
          email: "",
          phone: "",
          termsAccepted: false,
        });
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <Container>
      <Popup>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </BackButton>

        <LeftColumn aria-label="Logistics Illustration" />

        <RightColumn>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <CheckboxLabel>
              <CheckboxInput
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                required
              />
              Agree to
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                Terms & Conditions
              </a>
            </CheckboxLabel>

            <SubmitButton type="submit">Join Now</SubmitButton>
          </Form>
        </RightColumn>
      </Popup>
    </Container>
  );
};

export default GetStarted;
