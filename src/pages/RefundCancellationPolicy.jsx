import React from 'react';
import { Container, Card } from 'react-bootstrap';

const RefundCancellationPolicy = () => {
  return (
    <div className="policy-container my-5">
      <Container>
        <Card className="p-4 policy-card">
          <Card.Body>
            <h1 className="text-center mb-4 policy-title">Refund and Cancellation Policy</h1>

            <p className="policy-intro">
              Our (“VAAPS”) focus is to enable our customers with utmost satisfaction. In the event, if you are displeased with the goods or products provided, we will refund back the money, provided the reasons are genuine and proved after investigation. Please read the fine prints of each deal before buying it, which provides all details about the product you purchase.
            </p>

            <p className="mb-4">
              In case of dissatisfaction arising out of the products, clients have the liberty to cancel their orders and request a refund from us. Our policies for the cancellation and refund are as under:
            </p>

            <hr />

            <section className="policy-section">
              <h2 className="section-heading">Cancellation Policy</h2>
              <p>
                For cancellation purposes, please contact us via our **“Contact us”** link. Cancellation requests for orders will be considered only if the request is made **within 24 hours of placing an order** or the order is processed, whichever is earlier; however, such cancellation requests will not be entertained if the same have been communicated to the vendors/merchants and they have initiated the process of shipping.
              </p>
              <p>
                In case of receipt of damaged or defective items/products, please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at its own end. This should be reported **within 1 day of receipt of the products**.
              </p>
              <p>
                In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service **within 24 hours of receiving the product**. The Customer Service Team after looking into your complaint will take an appropriate decision.
              </p>
            </section>

            <hr />

            <section className="policy-section">
              <h2 className="section-heading">Refund Policy</h2>
              <p>
                Orders once delivered and accepted by the customer cannot be refunded. If the order is cancelled before the same is processed, the amount paid will be refunded in due time. In case you feel the order is not as per specification, please contact our customer care team **immediately within 24 hours**.
              </p>
            </section>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default RefundCancellationPolicy;