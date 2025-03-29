import { render, screen, fireEvent } from "@testing-library/react";
import TermsPage from "@/app/terms-and-conditions/page"; // Adjust the path if necessary
import { useRouter } from "next/navigation";

// Mock useRouter to simulate navigation behavior
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("TermsPage", () => {
  let mockPush;

  beforeEach(() => {
    mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });
  });

  test("should render the TermsPage with correct title", () => {
    render(<TermsPage />);
    
    // Check if the title is rendered correctly
    const titleElement = screen.getByText(/TERMS & CONDITIONS/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("should display the correct last updated date", () => {
    render(<TermsPage />);
    
    const dateElement = screen.getByText(/Last updated: /i);
    expect(dateElement).toBeInTheDocument();
    expect(dateElement).toHaveTextContent("Last updated:");
  });

  test("should show the back button and trigger navigation on click", () => {
    render(<TermsPage />);
    
    const backButton = screen.getByText(/← Back/i);
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);
    expect(mockPush).toHaveBeenCalledWith("/"); // Assuming it's going to the homepage
  });

  test("should show the dropdown when the back button is hovered", () => {
    render(<TermsPage />);
    
    const backButton = screen.getByText(/← Back/i);
    fireEvent.mouseEnter(backButton);

    // Check if the dropdown shows the links
    const dropdownLinks = screen.getAllByText(/Terms of Use|Cookie Policy/i);
    expect(dropdownLinks.length).toBeGreaterThan(0);
  });

  test("should correctly render the sections and handle scroll visibility", () => {
    render(<TermsPage />);
    
    // Check if the fade-in section is visible
    const fadeInSections = screen.getAllByClassName("fade-in-section");
    expect(fadeInSections.length).toBeGreaterThan(0);
    
    // Optionally trigger scroll to test visibility (if necessary)
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(fadeInSections[0]).toBeVisible();
  });
});
