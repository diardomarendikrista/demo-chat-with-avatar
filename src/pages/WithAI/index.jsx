import { LeftSection, RightSection, Wrapper } from "./styles";
import ChatComponent from "./ChatComponent";
import Component3D from "./Component3D";

export default function WithAI({ model }) {
  return (
    <Wrapper>
      <LeftSection>
        <Component3D />
      </LeftSection>

      <RightSection>
        <ChatComponent model={model} />
      </RightSection>
    </Wrapper>
  );
}
