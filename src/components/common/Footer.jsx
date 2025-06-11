import styled from "styled-components";

const FooterContainer = styled.footer`
  width: 100%;
  background: rgba(30, 30, 30, 0.4); /* darker glass tone */
  backdrop-filter: blur(15px) saturate(120%);
  -webkit-backdrop-filter: blur(15px) saturate(120%);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.3);

  color: white;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-size: 0.875rem;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.75rem;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div>
        <p>
          &copy; {new Date().getFullYear()} SwiftMove Logistics. All rights
          reserved.
        </p>
      </div>
    </FooterContainer>
  );
};

export default Footer;
