import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthPage from '../auth/page'; // A megfelelő elérési út az AuthPage komponenshez
import { useRouter } from 'next/navigation';

// Mock a router és fetch hívásokat
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('fetch', () => ({
  fetch: jest.fn(),
}));

describe('AuthPage', () => {
  let mockRouter: any;

  beforeEach(() => {
    // A mock router minden teszt előtt beállítása
    mockRouter = { push: jest.fn(), back: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('should render the login form initially', () => {
    render(<AuthPage />);

    // Ellenőrizzük, hogy a bejelentkezéshez szükséges szöveg megjelenik
    expect(screen.getByText("Let's Sign In")).toBeInTheDocument();
    expect(screen.getByText("Welcome back! Enter your credentials.")).toBeInTheDocument();
  });

  it('should change to registration form when clicked on "Register"', () => {
    render(<AuthPage />);

    // Kattintunk a regisztrációra
    fireEvent.click(screen.getByText("Don't have an account? Register"));

    // Ellenőrizzük, hogy a regisztráció szövege megjelenik
    expect(screen.getByText("Let's Register")).toBeInTheDocument();
    expect(screen.getByText("Create an account to get started!")).toBeInTheDocument();
  });

  it('should show error if passwords do not match', async () => {
    render(<AuthPage />);

    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm your password'), { target: { value: 'differentpassword' } });

    fireEvent.click(screen.getByText('Register'));

    // Ellenőrizzük, hogy megjelenik a hibás jelszóüzenet
    await waitFor(() => {
      expect(screen.getByText('⚠️ A jelszavak nem egyeznek!')).toBeInTheDocument();
    });
  });

  it('should call fetch API on form submission', async () => {
    render(<AuthPage />);

    // Email és jelszó kitöltése
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'password123' } });

    // Mock fetch válasz
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ message: 'Success' }),
    });
    global.fetch = mockFetch;

    // Submit kattintás
    fireEvent.click(screen.getByText('Sign In'));

    // Várakozás, hogy az API hívás megtörténjen
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/login', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
      }));
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should show error message if fetch API call fails', async () => {
    render(<AuthPage />);

    // Email és jelszó kitöltése
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'password123' } });

    // Mock fetch válasz hibával
    const mockFetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({ error: 'Invalid credentials' }),
    });
    global.fetch = mockFetch;

    // Submit kattintás
    fireEvent.click(screen.getByText('Sign In'));

    // Ellenőrizzük, hogy megjelenik a hibaüzenet
    await waitFor(() => {
      expect(screen.getByText('⚠️ Hiba történt!')).toBeInTheDocument();
    });
  });
});
