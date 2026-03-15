import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

function ScrollToTopButton() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 100);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="scroll-to-top-container">
      <button
        className="scroll-to-top-btn"
        style={{ display: showScrollTop ? "block" : "none" }}
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        type="button"
      >
        <FaArrowUp />
      </button>
    </div>
  );
}

export default ScrollToTopButton;
