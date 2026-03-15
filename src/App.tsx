import { useEffect, useState } from "react";
import MembershipForm from "./components/form/MembershipForm";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ScrollToTopButton from "./components/layout/ScrollToTopButton";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isMenuOpen);
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isMenuOpen]);

  return (
    <div className="bg">
      <Header
        isMenuOpen={isMenuOpen}
        onOpenMenu={() => setIsMenuOpen(true)}
        onCloseMenu={() => setIsMenuOpen(false)}
      />

      <main className="page">
        <MembershipForm />
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
