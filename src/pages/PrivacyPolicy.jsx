import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container my-5">
      <Container>
        <Card className="p-4 privacy-policy-card">
          <Card.Body>
            <h1 className="text-center mb-4 policy-title">PRIVACY POLICY</h1>
            <p className="policy-intro">
              VAAPS, i.e., M/s. VAAPS Enterprise, a Guwahati-based partnership firm in the segment of dealing and marketing with Joss sticks, incense sticks, and other incense products under its brand name “PRRAHI Agarbatti,” which is a registered Trademark, is committed to protecting your privacy. This Privacy Policy outlines how VAAPS collects, uses, and safeguards your personal information on its website, www.prrahi.in. By accessing or using our services, you agree to the practices described in this policy.
            </p>

            <hr />

            <section className="policy-section" id="section-1">
              <h2 className="section-heading">SECTION 1 – KYC (Know your customer): What do we do with your information?</h2>
              <p>
                When you purchase products from our store, as part of the buying and selling process, we collect the personal information you give us, such as your **name**, **address**, **contact details**, and **email address**.
              </p>
              <p>
                When you browse our store, we also automatically receive your computer’s **internet protocol (IP) address** to provide us with information that helps us learn about your browser and operating system.
              </p>
              <p>
                **Email marketing (if applicable):** With your permission, we may send you emails, messages, texts over WhatsApp, etc., about our store, new products, and other updates.
              </p>
            </section>

            <hr />

            <section className="policy-section" id="section-2">
              <h2 className="section-heading">SECTION 2 – CONSENT</h2>
              <h3 className="sub-heading">How do you get my consent?</h3>
              <p>
                When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery, or return a purchase, we imply that you consent to us collecting that data and using it for that specific reason only.
              </p>
              <p>
                If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent or provide you with an opportunity to say no.
              </p>
              <h3 className="sub-heading">How do I withdraw my consent?</h3>
              <p>
                If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use, or disclosure of your information, at any time, by contacting us at **+91 99540 22020** or mailing us at:
              </p>
              <address>
                M/s. VAAPS Enterprise <br />
                Building No. 1, Ground Floor, Sikaria Compound <br />
                Christian Basti, G S Road, Guwahati <br />
                District: Kamrup Metro, Assam – 781 005
              </address>
            </section>

            <hr />

            <section className="policy-section" id="section-3">
              <h2 className="section-heading">SECTION 3 – DISCLOSURE</h2>
              <p>
                We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.
              </p>
            </section>

            <hr />

            <section className="policy-section" id="section-4">
              <h2 className="section-heading">SECTION 4 – Payment</h2>
              <p>
                If you choose a direct payment gateway to complete your purchase, then VAAPS will store your credit card data. It is encrypted through the **Payment Card Industry Data Security Standard (PCI-DSS)**. Your purchase transaction data is stored only as long as is necessary to complete your purchase transaction. Once the same stands completed, your purchase transaction-related information shall immediately be deleted.
              </p>
              <p>
                All direct payment gateways adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like VISA, MasterCard, American Express, and Discover. PCI-DSS requirements help and ensure the secure handling of credit card information by our store and its service providers. For more insight, you may also read Terms of Service of VAAPS.
              </p>
            </section>

            <hr />

            <section className="policy-section" id="section-5">
              <h2 className="section-heading">SECTION 5 – THIRD-PARTY SERVICES</h2>
              <p>
                In general, the third-party providers used by us will only collect, use, and disclose your information to the extent necessary to allow them to perform the services they provide to us. However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.
              </p>
              <p>
                For these providers, we recommend that you read their privacy policies so that you can understand the manner in which your personal information will be handled by these providers. In particular, it shall be remembered that certain providers may be located in or have facilities that are located in a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.
              </p>
              <p>
                As an example, if you are located in Canada and your transaction is processed by a payment gateway located in the United States, then your personal information used in completing that transaction may be subject to disclosure under United States’ legislation, including the Patriot Act. Once you leave our store’s website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website’s Terms of Service.
              </p>
              <h3 className="sub-heading">Links:</h3>
              <p>
                When you click on links on our store, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.
              </p>
            </section>

            <hr />

            <section className="policy-section" id="section-6">
              <h2 className="section-heading">SECTION 6 – SECURITY</h2>
              <p>
                To protect your personal information, we take reasonable precautions and follow industry best practices to make sure that the same are not inappropriately lost, misused, accessed, disclosed, altered, or destroyed.
              </p>
              <p>
                If you provide us with your credit card information, the information shall remain encrypted using **secure socket layer technology (SSL)** and stored with an **AES-256 encryption**. Although no method of transmission over the Internet or electronic storage is 100% secure, we follow all PCI-DSS requirements and implement additional standards which are generally accepted by the industry.
              </p>
            </section>

            <hr />

            <section className="policy-section" id="section-7">
              <h2 className="section-heading">SECTION 7 – COOKIES</h2>
              <p>
                Here is a list of cookies that we use. We’ve listed them here so you can choose if you want to opt-out of cookies or not.
              </p>
              <ul>
                <li>`_session_id`, unique token, sessional, Allows Blended Bean to store information about your session (referrer, landing page, etc.).</li>
                <li>`_secure_session_id`, unique token, sessional</li>
              </ul>
            </section>

            <hr />

            <section className="policy-section" id="section-8">
              <h2 className="section-heading">SECTION 8 – AGE OF CONSENT</h2>
              <p>
                By using this site, you represent that you have at least attained the **age of majority** in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
              </p>
            </section>

            <hr />

            <section className="policy-section" id="section-9">
              <h2 className="section-heading">SECTION 9 – CHANGES TO THIS PRIVACY POLICY</h2>
              <p>
                We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it. If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.
              </p>
            </section>

            <hr />

            <section className="policy-section" id="section-10">
              <h2 className="section-heading">SECTION 10 – QUESTIONS AND CONTACT INFORMATION</h2>
              <p>
                If you would like to access, correct, amend, or delete any personal information we have about you, register a complaint, or simply want more information, contact our Privacy Compliance Officer at **+91 99540 22020** or by mailing us at:
              </p>
              <address>
                M/s. VAAPS Enterprise <br />
                Building No. 1, Ground Floor, Sikaria Compound <br />
                Christian Basti, G S Road, Guwahati <br />
                District: Kamrup Metro, Assam – 781 005
              </address>
            </section>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;