import { render } from '@testing-library/react';
import NavButton from './NavButton';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

describe('NavButton', () => {
  beforeEach(() => {
    // prevent leakage between tests
    mockedUsedNavigate.mockClear();
  });

  test('renders the given display text', () => {
    const { container } = render(<NavButton route="/myroute" displayText="Go Home" />);
    const navButton = container.querySelector('button') as HTMLButtonElement;

    expect(navButton).toHaveTextContent('Go Home');
  });

  test('navigates to route on click', () => {
    const { container } = render(<NavButton route="/myroute" displayText="Go Home" />);
    const navButton = container.querySelector('button') as HTMLButtonElement;

    expect(mockedUsedNavigate).not.toHaveBeenCalled();

    navButton.click();

    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/myroute');
  });
});
