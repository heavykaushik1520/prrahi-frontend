import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Card,
  Modal,
} from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import TopBanner from "../top/TopBanner";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // for modal

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://artiststation.co.in/prrahi-api/api/news"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNews(data);
      } catch (e) {
        setError("Failed to fetch news. Please try again later.");
        console.error("Fetching news failed:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const getBaseUrl = () => {
    return "https://artiststation.co.in/prrahi-api";
  };

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Spinner animation="border" role="status" className="custom-spinner">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <>
    <TopBanner/>
      <div className="news-page py-5">
        <Container>
          <Row className="g-4 mb-5">
            {news.map((item, index) => (
              <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  className="news-card border-0 animate__animated animate__fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="news-image-container">
                    <Card.Img
                      variant="top"
                      src={`${getBaseUrl()}${item.imageUrl}`}
                      alt={`News ${index + 1}`}
                      className="news-image"
                    />

                    <div
                      className="news-overlay d-flex justify-content-center align-items-center"
                      onClick={() =>
                        setSelectedImage(`${getBaseUrl()}${item.imageUrl}`)
                      }
                    >
                      <FaEye className="overlay-icon" size={40} />
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Modal for Enlarged Image */}
          <Modal
            show={!!selectedImage}
            onHide={() => setSelectedImage(null)}
            centered
            size="lg"
          >
            <Modal.Body className="p-0 text-center">
              <img
                src={selectedImage}
                alt="Enlarged"
                style={{ width: "100%", height: "auto" }}
              />
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default News;
