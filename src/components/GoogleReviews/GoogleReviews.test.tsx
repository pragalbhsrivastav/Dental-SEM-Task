import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GoogleReviews from './GoogleReviews';
import { useGoogleReviews } from '../../hooks/useGoogleReviews';

jest.mock('../../hooks/useGoogleReviews', () => ({
  useGoogleReviews: jest.fn(),
}));

jest.mock('../../assests/Error', () => () => <svg data-testid="error-svg" />);

describe('GoogleReviews', () => {
  const placeId = 'test-place-id';

  beforeEach(() => {
    (useGoogleReviews as jest.Mock).mockReturnValue({
      reviews: [
        { author_name: 'John Doe', rating: 5, time: 1682595600, profile_photo_url: 'http://example.com/photo.jpg', author_url: 'http://example.com', text: 'Great!', relative_time_description: '2 days ago' },
      ],
      loading: false,
      error: null,
      loadMoreReviews: jest.fn(),
      hasMore: true,
    });
  });

  test('renders reviews correctly', () => {
    render(<GoogleReviews placeId={placeId} />);

    console.log('heading')
    expect(screen.getByText(/Customer Reviews/i)).toBeInTheDocument();

    console.log('Review Great')
    expect(screen.getByText(/Great!/i)).toBeInTheDocument();
    console.log('Review Great')

    expect(screen.getByText(/Okay./i)).toBeInTheDocument();
  });

  test('displays loading message when loading', () => {
    (useGoogleReviews as jest.Mock).mockReturnValue({
      reviews: [],
      loading: true,
      error: null,
      loadMoreReviews: jest.fn(),
      hasMore: false,
    });

    render(<GoogleReviews placeId={placeId} />);

    expect(screen.getByText(/Loading reviews.../i)).toBeInTheDocument();
  });

  test('displays error message when there is an error', () => {
    (useGoogleReviews as jest.Mock).mockReturnValue({
      reviews: [],
      loading: false,
      error: new Error('Something went wrong'),
      loadMoreReviews: jest.fn(),
      hasMore: false,
    });

    render(<GoogleReviews placeId={placeId} />);

    expect(screen.getByTestId('error-svg')).toBeInTheDocument();
  });

  test('sorts reviews by rating', () => {
    render(<GoogleReviews placeId={placeId} />);

    expect(screen.getAllByText(/Great!/i)[0]).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Sort reviews by date or rating/i), { target: { value: 'rating' } });

    expect(screen.getAllByText(/Great!/i)[0]).toBeInTheDocument();
  });
});
