import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DashboardPage from "@/app/dashboard/page"; // A komponens elérési útja
import { useRouter } from "next/navigation";

// Mocking a router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("DashboardPage Component", () => {
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = {
      replace: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("should display the loading screen if email is not in localStorage", () => {
    localStorage.removeItem("userEmail");
    render(<DashboardPage />);
    
    const loadingMessage = screen.getByText(/Betöltés.../i);
    expect(loadingMessage).toBeInTheDocument();
  });

  it("should redirect to login page if email is not in localStorage", async () => {
    localStorage.removeItem("userEmail");
    render(<DashboardPage />);
    
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith("/auth");
    });
  });

  it("should display the user's email when it is in localStorage", () => {
    localStorage.setItem("userEmail", "test@example.com");
    render(<DashboardPage />);
    
    const emailMessage = screen.getByText(/Üdvözlünk, test@example.com!/i);
    expect(emailMessage).toBeInTheDocument();
  });

  it("should call logout and redirect to login page when logout button is clicked", () => {
    localStorage.setItem("userEmail", "test@example.com");
    render(<DashboardPage />);
    
    const logoutButton = screen.getByText(/Logout/i);
    fireEvent.click(logoutButton);

    expect(localStorage.getItem("userEmail")).toBeNull();
    expect(localStorage.getItem("lastPage")).toBe("/dashboard");
    expect(mockRouter.replace).toHaveBeenCalledWith("/auth");
  });
});
