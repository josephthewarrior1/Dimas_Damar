import { Outlet } from "react-router-dom";
import MobileContainer from "../components/MobileContainer";

export default function IntroLayout() {
  return (
    <MobileContainer>
      <Outlet />
    </MobileContainer>
  );
}
