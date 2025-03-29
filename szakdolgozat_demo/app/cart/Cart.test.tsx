import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from './page'; // Path to your CartPage component
import { useRouter } from 'next/navigation';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CartPage', () => {
  let routerMock: { push: jest.Mock };

  beforeEach(() => {
    // Reset router mock before each test
    routerMock = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(routerMock);
  });

  it('should render the empty cart state correctly', () => {
    render(<CartPage />);

    // Check if the empty cart message is displayed
    expect(screen.getByText('YOUR BAG IS EMPTY')).toBeInTheDocument();
    expect(screen.getByText('There are no products in your bag')).toBeInTheDocument();

    // Check if "SHOP MENS" and "SHOP WOMENS" buttons are present
    const mensButton = screen.getByText('SHOP MENS');
    const womensButton = screen.getByText('SHOP WOMENS');

    expect(mensButton).toBeInTheDocument();
    expect(womensButton).toBeInTheDocument();

    // Simulate button clicks
    fireEvent.click(mensButton);
    expect(routerMock.push).toHaveBeenCalledWith('/mens');

    fireEvent.click(womensButton);
    expect(routerMock.push).toHaveBeenCalledWith('/womens');
  });

  it('should open and close the chat assistant correctly', () => {
    render(<CartPage />);

    // Check if chat assistant button is rendered
    const chatButton = screen.getByRole('button', { name: /ai assistant/i });
    expect(chatButton).toBeInTheDocument();

    // Open chat
    fireEvent.click(chatButton);
    expect(screen.getByText('AI Assistant')).toBeInTheDocument();

    // Close chat
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(screen.queryByText('AI Assistant')).not.toBeInTheDocument();
  });

  it('should send messages in chat', () => {
    render(<CartPage />);

    // Open chat assistant
    fireEvent.click(screen.getByRole('button', { name: /ai assistant/i }));

    // Get the input and message send button
    const inputField = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByRole('button', { name: /send/i });

    // Simulate user typing and sending a message
    fireEvent.change(inputField, { target: { value: 'Hello' } });
    fireEvent.click(sendButton);

    // Check if user message is rendered
    expect(screen.getByText('Hello')).toBeInTheDocument();

    // Check if bot response is displayed after timeout
    setTimeout(() => {
      expect(screen.getByText("I'm here to assist you. You can ask about products, shipping, or anything else!")).toBeInTheDocument();
    }, 1000);
  });
});
