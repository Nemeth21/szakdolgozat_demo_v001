import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import AccessibilityStatement from "../app/accessibility-statement/page"; // Itt a fájl elérési útja

describe("AccessibilityStatement Component", () => {
  it("should render AccessibilityStatement component", () => {
    render(<AccessibilityStatement />);

    // Ellenőrizzük, hogy a komponens tartalmazza a szöveget, pl. "OUR COMMITMENT TO ACCESSIBILITY"
    expect(screen.getByText("OUR COMMITMENT TO ACCESSIBILITY")).toBeInTheDocument();
  });

  it("should go back when back button is clicked", () => {
    const history = createMemoryHistory();
    history.push("/accessibility");

    render(
      <Router history={history}>
        <AccessibilityStatement />
      </Router>
    );

    // Kattintunk a Back gombra
    fireEvent.click(screen.getByText("← Back"));

    // Ellenőrizzük, hogy a történet visszalépett az előző oldalra
    expect(history.location.pathname).toBe("/");
  });
});
