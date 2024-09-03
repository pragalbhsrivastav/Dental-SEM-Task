import { useState, useEffect, useMemo } from "react";
import axios from "axios";

interface Review {
  author_name: string;
  author_url: string;
  language: string;
  original_language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated: boolean;
}

export const useGoogleReviews = (placeId: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pageToken, setPageToken] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const apiUrl = useMemo(() => "https://maps.googleapis.com/maps/api/place/details/json", []);

  const fetchGoogleReviews = async (token: string | null) => {
    if (!API_KEY) {
      throw new Error("API Key is missing");
    }

    try {
      const response = await axios.get(apiUrl, {
        params: {
          place_id: placeId,
          fields: "reviews",
          key: API_KEY,
          pagetoken: token || "",
        },
      });

      const newReviews: Review[] = response.data.result.reviews || [];
      const nextPageToken = response.data.next_page_token || null;

      return { reviews: newReviews, nextPageToken };
    } catch (error: any) {
      console.error("Error fetching Reviews", error);
      throw new Error("Failed to fetch reviews. Please try again later.");
    }
  };

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        const { reviews: newReviews, nextPageToken } = await fetchGoogleReviews(pageToken);

        setReviews(prevReviews => {
          const existingReviews = new Set(prevReviews.map(r => `${r.author_name}-${r.text}`));
          const uniqueReviews = newReviews.filter(r => !existingReviews.has(`${r.author_name}-${r.text}`));
          return [...prevReviews, ...uniqueReviews];
        });

        setPageToken(nextPageToken);
        setHasMore(!!nextPageToken);
      } catch (err: any) {
        setError(err.message || "Failed to fetch reviews.");
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [placeId, pageToken, apiUrl]);

  const loadMoreReviews = () => {
    if (hasMore) {
      setPageToken(prevToken => prevToken);
    }
  };

  return { reviews, loading, error, loadMoreReviews, hasMore };
};
