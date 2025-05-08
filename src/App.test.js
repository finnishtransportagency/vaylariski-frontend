import { render, screen } from "@testing-library/react";

import App from "./App.js";

test("renders app title element", () => {
  render(<App />);
  const titleElement = screen.getByText(/RIV/i);
  expect(titleElement).toBeInTheDocument();
});
