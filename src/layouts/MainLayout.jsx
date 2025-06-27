import MobileContainer from "../components/MobileContainer";

export default function MainLayout({ children }) {
  return (
    <MobileContainer>
      {children}
    </MobileContainer>
  );
}