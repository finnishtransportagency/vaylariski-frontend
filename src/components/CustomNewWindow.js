import { useState, useEffect, useRef, useContext } from "react";
import NotificationContext from "contexts/NotificationContext";
import { createPortal } from "react-dom";

const CustomNewWindow = (props) => {
  const [container, setContainer] = useState(null);
  const newWindowRef = useRef(null);
  const { setNotificationStatus } = useContext(NotificationContext);

  // Helper function for setting an error notification if popups are blocked
  const handlePopupBlock = () => {
    setNotificationStatus({
      severity: "error",
      message:
        "Karttaa ei saatu näkyville. Teidän täytyy sallii pop-up ikkunaa tälle sivulle.",
      visible: true,
    });
  };

  // Helper function for copying styles from src to dest
  const copyStyles = (src, dest) => {
    Array.from(src.styleSheets).forEach((styleSheet) => {
      const styleElement = styleSheet.ownerNode.cloneNode(true);
      styleElement.href = styleSheet.href;
      dest.head.appendChild(styleElement);
    });
    Array.from(src.fonts).forEach((font) => dest.fonts.add(font));
  };

  useEffect(() => {
    // Create container element on client-side
    setContainer(document.createElement("div"));
  }, []);

  useEffect(() => {
    // When container is ready
    if (container) {
      // Create window
      const handle = window.open(
        "",
        props.title ?? "",
        "width=1200,height=1000,left=200,top=200,popup"
      );

      if (!handle) {
        // The window wasn't allowed to open
        // This is likely caused by built-in popup blockers.
        handlePopupBlock();
        return;
      }

      // Assign window
      newWindowRef.current = handle;

      // Copy the styles from the original window
      copyStyles(window.document, newWindowRef.current.document);

      // Append container
      newWindowRef.current.document.body.appendChild(container);

      // Save reference to window for cleanup
      const curWindow = newWindowRef.current;

      // Return cleanup function
      return () => curWindow.close();
    }
  }, [container]);

  return container && createPortal(props.children, container);
};

export default CustomNewWindow;
