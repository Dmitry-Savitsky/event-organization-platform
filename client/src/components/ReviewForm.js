import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { createReview } from "../http/ReviewApi";

const ReviewForm = ({ showReviewForm, handleReviewFormClose, clientId, orderId }) => {
  const [reviewData, setReviewData] = useState({
    ReviewText: "",
    ReviewRating: 0,
    idClients: clientId,  // Include idClients in the initial state
    idOrders: orderId,    // Include idOrders in the initial state
  });

  const handleChange = (e) => {
    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newReview = await createReview(reviewData);

      // Handle the response or close the modal, depending on your needs
      console.log("Review created:", newReview);

      // Clear the form and close the modal
      setReviewData({
        ReviewText: "",
        ReviewRating: 0,
        idClients: clientId,
        idOrders: orderId,
      });
      handleReviewFormClose();
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  return (
    <Modal show={showReviewForm} onHide={handleReviewFormClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="ReviewText">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="text"
              name="ReviewText"
              value={reviewData.ReviewText}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="ReviewRating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              name="ReviewRating"
              value={reviewData.ReviewRating}
              onChange={handleChange}
              min="0"
              max="5"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create Review
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewForm;
