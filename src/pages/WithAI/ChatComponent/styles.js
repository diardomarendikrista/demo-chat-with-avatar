import styled from "styled-components";

export const ContainerChat = styled.div`
  position: absolute;
  bottom: 0;
  right: 50%;
  transform: translate(50%, 0);

  height: 90%;
  width: 90%;
  margin: auto;

  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`;

export const ChatHeader = styled.div`
  position: relative;
  padding: 20px 20px 0 20px;

  .title {
    font-size: 30px;
    font-weight: bold;
  }

  .hr {
    width: 100%;
    margin: 8px 0;
    border-bottom: solid 1px black;
  }
`;

export const MessageSection = styled.div`
  flex: 1;
  overflow-y: auto;
  margin: 20px 20px 70px 20px;
  padding: 12px 4px 12px 0;
  border-top: solid 1px darkgray;
  border-bottom: solid 1px darkgray;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const MessageWrapper = styled.div`
  display: flex;
  justify-content: ${({ $isYou }) => ($isYou ? "flex-end" : "flex-start")};
`;

export const ChatBallon = styled.div`
  display: inline;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: ${({ $isYou }) => ($isYou ? "#379EB1" : "#E5E7EB")};
  color: ${({ $isYou }) => ($isYou ? "#ffffff" : "#000000")};
`;

export const InputSection = styled.div`
  width: 100%;
  position: absolute;
  bottom: 20px;
  display: flex;
`;

export const InputWrapper = styled.div`
  width: 100%;
  padding-left: 20px;

  input {
    border-radius: 8px 0 0 8px;
  }
`;

export const ButtonWrapper = styled.div`
  padding-right: 20px;

  button {
    border-radius: 0 8px 8px 0;
  }
`;
