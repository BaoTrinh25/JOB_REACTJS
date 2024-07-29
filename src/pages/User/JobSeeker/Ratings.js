import React, { useState, useEffect } from 'react';
import APIs, { endpoints } from '../../../configs/APIs';

const Ratings = ({ jobId }) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await APIs.get(endpoints['rating'](jobId)); // Call API with jobId
        setRatings(response.data.results);
      } catch (error) {
        console.error('Error fetching ratings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [jobId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-4">
      {ratings.map((rating) => (
        <div key={rating.id} className="p-4 border rounded-lg shadow-md">
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-5 h-5 ${index < rating.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M9.049 2.927c.3-.92 1.603-.92 1.903 0l1.482 4.564a1 1 0 00.95.69h4.771c.967 0 1.371 1.24.588 1.81l-3.838 2.787a1 1 0 00-.362 1.118l1.482 4.564c.3.92-.755 1.688-1.54 1.118l-3.838-2.787a1 1 0 00-1.176 0l-3.838 2.787c-.785.57-1.84-.198-1.54-1.118l1.482-4.564a1 1 0 00-.362-1.118L1.207 9.991c-.783-.57-.379-1.81.588-1.81h4.771a1 1 0 00.95-.69l1.482-4.564z"
                />
              </svg>
            ))}
          </div>
          {/* <p className="mt-2 text-gray-700">{rating.comment}</p> */}
        </div>
      ))}
    </div>
  );
};

export default Ratings;
