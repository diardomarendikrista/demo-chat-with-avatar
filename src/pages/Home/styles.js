import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const LeftSection = styled.div`
  flex: 1;
`;

export const RightSection = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
`;
