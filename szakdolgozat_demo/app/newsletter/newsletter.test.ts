import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NewsletterPage from "@/app/newsletter/page"; // A komponens elérési útja
import { useRouter } from "next/navigation";

// Mocking a router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("NewsletterPage Component", () => {
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("should display the loading state when the form is being submitted", () => {
    render(<NewsletterPage />);

    const submitButton = screen.getByText(/Sign Up/i);
    fireEvent.click(submitButton);
    
    const loadingMessage = screen.getByText(/Processing.../i);
    expect(loadingMessage).toBeInTheDocument();
  });

  it("should submit the form and display a success message", async () => {
    render(<NewsletterPage />);

    // Simulating user input
    fireEvent.change(screen.getByLabelText(/Email Address*/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/First Name*/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name*/i), {
      target: { value: "Doe" },
    });

    // Mocking the API response for successful signup
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Success" }),
    });

    const submitButton = screen.getByText(/Sign Up/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      const successMessage = screen.getByText(/✅ Successful signup!/i);
      expect(successMessage).toBeInTheDocument();
    });
  });

  it("should display an error message if the signup fails", async () => {
    render(<NewsletterPage />);

    // Simulating user input
    fireEvent.change(screen.getByLabelText(/Email Address*/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/First Name*/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name*/i), {
      target: { value: "Doe" },
    });

    // Mocking the API response for failed signup
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Error signing up" }),
    });

    const submitButton = screen.getByText(/Sign Up/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(/❌ Error signing up. Please try again./i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("should navigate back to home page when back button is clicked", () => {
    render(<NewsletterPage />);

    const backButton = screen.getByText(/← Back to Home/i);
    fireEvent.click(backButton);

    expect(mockRouter.push).toHaveBeenCalledWith("/");
  });
});
