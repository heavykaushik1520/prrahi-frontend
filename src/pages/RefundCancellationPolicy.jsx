import React from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const RefundCancellationPolicy = () => {

  
  return (
    <div className="policy-container my-5">
      {/* Replaced Container and Card with standard Bootstrap components for responsiveness */}
      <Container>
        <Card className="shadow-lg border-0">
          <Card.Body className="p-4 p-md-5">

            <h1 className="text-center mb-4 text-dark fw-bolder">RETURN AND REFUND POLICY</h1>

            <section className="mb-5">
              <h2 className="text-2xl font-bold mb-3 border-bottom pb-2">Meaning / Definition of the Terms used:</h2>
              {/* Using ListGroup for clear definition styling */}
              <ListGroup variant="flush" className="text-dark">
                <ListGroup.Item>
                  <span className="fw-bold">1. “Company “</span> shall mean and include the terms “company,” “we,” “us,” or “our,” which in turn refers to “VAAPS Enterprise” under the brand name “PRRAHI Agarbatti” being a registered trademark.
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold">2. “Consent”</span> shall mean and include that customers by using our service over our website or through any device or application/s (app/s), registering an account, or making a purchase, hereby consent to our Return and Refund Policy and agree to its terms and covenants with full effect and consent in its true sense and spirits.
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold">3. “Customer”</span> shall mean and include any individual or person or organization that signs up and registers with VAAPS Enterprise to use the Services of VAAPS Enterprise and buys any goods / products for consideration for his/her/own individual purpose and not for the purpose of doing business with the same, such reselling.
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold">4. “Device”</span> shall mean and include any internet connected device such as a mobile phone, tablet, computer or any other device that can be used to visit VAAPS Enterprise over internet and use the services.
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold">5. “Service”</span> shall mean and include the services provided by VAAPS Enterprise as described in the relative terms (if available) and on this platform.
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold">6. “Website”</span> shall mean and include VAAPS Enterprise’s site, which can be accessed through the URL namely www.prrahi.in .
                </ListGroup.Item>
              </ListGroup>
            </section>

            <section className="mb-5">
              <h2 className="text-2xl font-bold mb-3 border-bottom pb-2">Return and Refund Policies:</h2>
              <p className="mb-3">
                By placing an order or making a purchase at VAAPS Enterprise (www.prrahi.in), you are agreeing to our terms and covenants along with the policies set forth here in below.
              </p>
              <p className="mb-3">
                Our focus is to enable our customers with utmost satisfaction. In the event, if you are displeased with the goods or products provided, we will refund back the money, provided the reasons are genuine and proved after investigation. Please read the fine prints of each deal before buying it, which provides all details about the product you purchase.
              </p>
              <p className="mb-4">
                In case of dissatisfaction arising out of the products, customers have liberty to cancel their orders and request a refund from us. Our policies for the cancellation and refund are as under:
              </p>

              {/* Cancellation Policy */}
              <Card className="mb-4 bg-light border-dark">
                <Card.Body>
                  <h3 className="h4 fw-bold text-dark">Cancellation Policy:</h3>
                  <p className="mb-0">
                    For cancellation purpose, please contact us via <Link to="/contact-us">“Contact us”</Link> link. Cancellation requests for orders will be considered only if the request is made within 24 hours of placing an order or the order is processed, whichever is earlier; however, such cancellation requests will not be entertained if the same have been communicated to the vendors/merchants and they have initiated the process of shipping. In case of receipt of damaged or defective items / products please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at its own end. This should be reported within 1 day of receipt of the products. In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 24 hours of receiving the product. The Customer Service Team after looking into your complaint will take appropriate decision. If there is something wrong with the product you bought, or if you are not happy with it, we will not be able to issue a refund for your item.
                  </p>
                </Card.Body>
              </Card>

              {/* Refund Policy */}
              <Card className="mb-4 bg-light border-dark">
                <Card.Body>
                  <h3 className="h4 fw-bold text-dark">Refund Policy:</h3>
                  <p className="mb-3">
                    We, VAAPS Enterprise are serving our customers with the best products. Every single product that you choose is thoroughly inspected, checked for defects and packaged with utmost care. We do this to ensure that you fall in love with our products.
                  </p>
                  <p className="mb-3">
                    Orders once delivered and accepted by customer cannot be refunded. If the order is cancelled before the same is processed, the amount paid will be refunded in due time. In case you feel the order is not as per specification, please contact our customer care team immediately within 24 hours.
                  </p>
                  <p className="mb-3">
                    It may happen that sometimes when you chose the product in stock may not remain available with us, or you may face some issues or troubles with our inventory and quality check. In such cases, we may have to cancel your order. You will be intimated about it in advance so that you don’t have to worry unnecessarily about your order. If you have purchased via Online payment (not Cash on Delivery), then you will be refunded once our team confirms your request.
                  </p>
                  <p className="mb-3">
                    We carry out thorough quality checking before processing the ordered item. We take utmost care while packing the product. At the same time we ensure that the packing is good to such extent that the items won’t get damaged during transit. Please note that VAAPS Enterprise is not liable for damages that are caused to the items during transit or transportation.
                  </p>

                  <p className="fw-bold ">We follow certain policies to ensure transparency, efficiency and quality customer care:</p>
                  <ul className="list-unstyled">
                    <li>a) We DO NOT allow returns on sold products, whether it was sold online or through retail outlets.</li>
                    <li>b) We DO NOT accept returned goods, as we believe that customers should get the best quality products.</li>
                    <li>c) Refunds are NOT given for any purchases made, whether they are purchased online or through retail store.</li>
                    <li>d) We DO NOT encourage exchanges of our products.</li>
                    <li>e) We DO NOT engage in reselling used products and discourage the same, because we cannot ensure the best quality for our customers.</li>
                  </ul>
                </Card.Body>
              </Card>
            </section>

            <section className="mb-5">
              <h2 className="text-2xl font-bold mb-3 border-bottom pb-2">Product Availability and Limitations:</h2>
              <p>
                VAAPS Enterprise may have to put a limit to the number of products available for purchase due to popularity and/or supply constraints of some of our products. We reserve the right to change quantities available for purchase at any time, even after you place an order. Furthermore, there may be occasions when we confirm your order but subsequently come to know that due to unavoidable reasons and circumstances the same order cannot be delivered for only reasons that we cannot put our customers’ satisfaction level at stake. In the event we cannot supply a product you have ordered, we will cancel the order and refund your purchase price in full.
              </p>
            </section>

            <section className="mb-5">
              <h2 className="text-2xl font-bold mb-3 border-bottom pb-2">Changes to our Return and Refund Policy:</h2>
              <p>
                We reserve the right to update, amend, alter or make any changes to the policies with regard to return and refund as described hereto so that accuracy always prevail and reflect in our services and policies. Unless otherwise required by law, those changes will be from time to time prominently posted in our website, and subsequent thereto, continuing with using our services shall bind you with the updated / amended Return and Refund Policy. In any event, if you do not wish to agree with the amended terms or any such updated Return and Refund Policy, then you can opt with deleting your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3 border-bottom pb-2">Contact:</h2>
              <p>
                In any event, or, for any reason/s, if you are not completely satisfied with any of our goods, products or services which we provide and as stated above, please feel free to immediately contact us without any hesitation and we will discuss any of such issues you are going through with our product, or you may for any feedback, further queries, other concerns please reach us to our Customer Care at <span><a href="https://www.prrahi.in">www.prrahi.in</a></span> or through Email services at <a href="mailto:care@prrahi.in">care@prrahi.in</a>.
              </p>
            </section>

          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default RefundCancellationPolicy;