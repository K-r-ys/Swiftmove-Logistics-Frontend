import React, { useState } from "react";
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
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  overflow: hidden;
`;

const Wrapper = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  padding: 3rem;
  border-radius: 16px;
  width: 90%;
  max-width: 700px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  text-align: center;
  animation: ${fadeIn} 1s ease;
`;

const Title = styled(motion.h2)`
  font-family: "Georgia", serif;
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: none;
  background: rgba(255, 255, 255, 0.25);
  color: white;
  font-size: 1rem;
  font-family: "Georgia", serif;
  outline: none;
  box-shadow: 0 0 8px rgba(255, 165, 0, 0.3);
  &::placeholder {
    color: #ffd580;
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border-radius: 12px;
  border: none;
  resize: none;
  height: 150px;
  background: rgba(255, 255, 255, 0.25);
  color: white;
  font-size: 1rem;
  font-family: "Georgia", serif;
  outline: none;
  box-shadow: 0 0 8px rgba(255, 165, 0, 0.3);
  &::placeholder {
    color: #ffd580;
  }
`;

const SubmitButton = styled.button`
  padding: 0.8rem;
  border-radius: 12px;
  border: none;
  background-color: #ffa500;
  color: white;
  font-size: 1.1rem;
  font-family: "Georgia", serif;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background-color: rgb(211, 138, 3);
  }
`;

const Message = styled.p`
  font-family: "Georgia", serif;
  font-size: 1.1rem;
  color: ${(props) => (props.error ? "#ff6b6b" : "#90ee90")};
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

const OrderSupport = () => {
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("");
    setError(false);

    if (!senderName.trim() || !message.trim()) {
      setFeedback("Please fill out both fields.");
      setError(true);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/communications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sender_name: senderName, message }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setFeedback("Message sent successfully!");
      setSenderName("");
      setMessage("");
    } catch (err) {
      setFeedback("Error sending message. Try again.");
      setError(true);
    }
  };

  return (
    <Container>
      <Wrapper
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft />
          Back
        </BackButton>

        <Title variants={fadeUp} initial="hidden" animate="visible">
          Order Support
        </Title>

        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Your Name"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
          />
          <TextArea
            placeholder="Type your message or concern..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <SubmitButton type="submit">Send Message</SubmitButton>
        </Form>

        {feedback && <Message error={error}>{feedback}</Message>}
      </Wrapper>
    </Container>
  );
};

export default OrderSupport;
