import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const electronicsImg = "/images/electronics1.jpg";
const furnitureImg = "/images/furniture.jpg";
const machineryImg = "/images/machinery.jpg";
const clothingImg = "/images/clothing.jpg";
const foodImg = "/images/food.jpg";
const toysImg = "/images/toys.jpg";
const backgroundImage = "/images/background.jpeg";

// Container with background and effects
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

  @media (max-width: 768px) {
    width: 95%;
    padding: 2rem;
  }
`;

const Heading = styled(motion.h1)`
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 2rem;
  font-weight: bold;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

// Back button styled as an icon
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

// Grid layout for product categories
const ProductGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ProductTile = styled(motion.div)`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05) rotateZ(2deg);
  }
`;

const ProductImage = styled(motion.img)`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: opacity 0.3s ease;
  filter: grayscale(30%);

  &:hover {
    filter: grayscale(0%);
    scale: 1.1;
  }

  @media (max-width: 480px) {
    height: 150px;
  }
`;

const ProductDescription = styled(motion.div)`
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 10px;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.3s, opacity 0.3s;

  ${ProductTile}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

const ProductPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  // ✅ Assign a unique image to each product
  const products = [
    { name: "Electronics", image: electronicsImg },
    { name: "Furniture", image: furnitureImg },
    { name: "Machinery", image: machineryImg },
    { name: "Clothing", image: clothingImg },
    { name: "Food & Beverages", image: foodImg },
    { name: "Toys", image: toysImg },
  ];

  return (
    <Container>
      <ContentWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <BackIcon onClick={handleBackClick} />
        <Heading
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          What We Transport
        </Heading>

        <ProductGrid
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.8,
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {products.map((product, index) => (
            <ProductTile
              key={index}
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <ProductImage src={product.image} alt={product.name} />
              <ProductDescription>{product.name}</ProductDescription>
            </ProductTile>
          ))}
        </ProductGrid>
      </ContentWrapper>
    </Container>
  );
};

export default ProductPage;
