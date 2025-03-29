import { render, screen, fireEvent } from "@testing-library/react";
import CookiePolicy from "@/app/cookie-policy/page"; // A komponens elérési útja
import { useRouter } from "next/navigation";

// Mocking a router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("CookiePolicy Component", () => {
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("should render the cookie policy page with the correct title", () => {
    render(<CookiePolicy />);
    
    const title = screen.getByText(/COOKIE POLICY 🍪/i);
    expect(title).toBeInTheDocument();
  });

  it("should display the correct update date", () => {
    render(<CookiePolicy />);
    
    const updateDate = screen.getByText(/Last updated/i);
    expect(updateDate).toBeInTheDocument();
  });

  it("should open and close the dropdown menu when hovered", () => {
    render(<CookiePolicy />);
    
    const backButton = screen.getByText("← Back ▼");
    fireEvent.mouseEnter(backButton);
    const dropdownMenu = screen.getByText("Terms & Conditions");
    expect(dropdownMenu).toBeInTheDocument();
    
    fireEvent.mouseLeave(backButton);
    expect(dropdownMenu).not.toBeInTheDocument();
  });

  it("should navigate to the homepage when back button is clicked", () => {
    render(<CookiePolicy />);
    
    const backButton = screen.getByText("← Back ▼");
    fireEvent.click(backButton);
    
    expect(mockRouter.push).toHaveBeenCalledWith("/");
  });

  it("should display the sections with fade-in effect when scrolled into view", () => {
    render(<CookiePolicy />);
    
    const section = screen.getByText(/WHAT ARE COOKIES?/i);
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(section).toHaveClass("fade-in-section");
  });
});
