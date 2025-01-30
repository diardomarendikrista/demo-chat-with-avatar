import { LeftSection, RightSection, Wrapper } from "./styles";
import ChatComponent from "./ChatComponent";
import Component3D from "./Component3D";

export default function Home() {
  return (
    <Wrapper>
      <LeftSection>
        <Component3D />
      </LeftSection>

      <RightSection>
        <ChatComponent />
      </RightSection>
    </Wrapper>
  );
}
