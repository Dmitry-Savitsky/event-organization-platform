import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import { getAllReviews } from '../http/ReviewApi';

const CommentsTab = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllReviews();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Comments</h2>
      {reviews.map((review) => (
        <Card key={review.idReview} className="mb-3">
          <Card.Body>
            <Card.Title>{review.ReviewText}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Rating:{' '}
              <StarRatings
                rating={review.reviewRating}
                starRatedColor="orange" // Customize star color
                numberOfStars={review.reviewRating} // Set numberOfStars dynamically
                starDimension="20px" // Set star size
                starSpacing="2px" // Set spacing between stars
              />
            </Card.Subtitle>
            <Card.Text>
              Client: {review.Client.ClientName}
              <br />
              Order: {review.Order.OrderComment}
              {/* Add more details as needed */}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CommentsTab;
