import { render, screen } from '@testing-library/react';
import TermsOfUse from '@/app/terms-of-use/page'; // Adjust the path if needed
import '@testing-library/jest-dom/extend-expect';

describe('TermsOfUse Component', () => {
  it('should render the Terms of Use page correctly', () => {
    render(<TermsOfUse />);

    // Check if the title is rendered
    const titleElement = screen.getByText(/TERMS OF USE/i);
    expect(titleElement).toBeInTheDocument();

    // Check if the last updated date is displayed
    const dateElement = screen.getByText(/Last updated:/i);
    expect(dateElement).toBeInTheDocument();

    // Check if sections are rendered
    const sections = screen.getAllByClassName('fade-in-section');
    expect(sections.length).toBeGreaterThan(0); // Ensure that sections are rendered

    // Check if specific section text is displayed
    const section1Text = screen.getByText(/Acceptance of Terms/i);
    expect(section1Text).toBeInTheDocument();

    const section2Text = screen.getByText(/User Accounts & Responsibilities/i);
    expect(section2Text).toBeInTheDocument();

    const section3Text = screen.getByText(/Intellectual Property Rights/i);
    expect(section3Text).toBeInTheDocument();

    // Check for images or background images, by validating the presence of elements
    const bgImageElements = screen.getAllByStyle(/background-image/i);
    expect(bgImageElements.length).toBeGreaterThan(0); // Ensure that images or background styles are applied
  });

  it('should navigate correctly when back button is clicked', () => {
    // Mock next/router useRouter hook
    const router = { push: jest.fn() };
    jest.spyOn(require('next/navigation'), 'useRouter').mockReturnValue(router);

    render(<TermsOfUse />);

    // Simulate a click on the back button
    const backButton = screen.getByText(/← Back ▼/i);
    backButton.click();

    // Check if router.push is called (this simulates the routing action)
    expect(router.push).toHaveBeenCalledWith('/');
  });
});
