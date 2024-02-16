import React, { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Navbar from "../Components/Navbar";
import my_img from "../Images/banner_hcb.png";
import { ref, push } from "firebase/database";
import { database } from "../firebase";
import axios from "axios";
import img1 from "../Images/ikon.png";
import Express_URL from "../Components/Express_URL";

const IKON = () => {
  const formRef = useRef();

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const formatPhoneNumber = (input) => {
    // Remove non-digit characters
    const phoneNumber = input.replace(/\D/g, "");

    // Apply the desired format
    const formattedPhoneNumber = phoneNumber.replace(
      /^(\d{3})(\d{3})(\d{4})$/,
      "($1) $2-$3"
    );

    return formattedPhoneNumber;
  };

  const [formData, setFormData] = useState({
    NM_firstName: "",
    NM_lastName: "",
    ID_email: "",
    NO_phoneNumber: "",
    CD_city: "",
    CD_state: "",
    CD_country: "",
    CA_category: "",
    DS_comments1: "",
    DS_comments2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "NO_phoneNumber") {
      // Remove non-digit characters
      const phoneNumber = value.replace(/\D/g, "");

      // Limit to 10 digits
      if (phoneNumber.length <= 10) {
        // Apply the desired format
        const formattedValue = formatPhoneNumber(phoneNumber);
        setFormData({ ...formData, [name]: formattedValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Set to true for 12-hour clock format
    });
    try {
      // Push the form data to the "inquiries" collection in Firebase
      const inquiriesRef = ref(database, "inquiries");
      await push(inquiriesRef, {
        ...formData,
        submitDateTime: formattedDateTime,
      });
      // Show success alert
      alert("Form submitted successfully!");
      // Send email
      await axios.post(`${Express_URL}/send-email-contact`, {
        ...formData,
        recipientEmail: formData.ID_email,
        subject: "Lead email",
        message: formData,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setFormData({
      NM_firstName: "",
      NM_lastName: "",
      ID_email: "",
      NO_phoneNumber: "",
      CD_city: "",
      CD_state: "",
      CD_country: "",
      CA_category: "",
      DS_comments1: "",
      DS_comments2: "",
    });
  };
  return (
    <>
      <Navbar />
      <div
        style={{
          background:
            "radial-gradient(ellipse at 50% -50%, #6c94ff 0, #000 100%)",
          height: "75px",
        }}
      ></div>
      <div className="banner mb-4">
        <iframe
          src="https://player.vimeo.com/video/806813966?background=1"
          style={{
            position: "absolute",
            top: " 50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "177.77777778vh",
            height: "56.25vw",
            boxSizing: "border-box",
            minHeight: "100%",
            minWidth: "100%",
          }}
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen=""
          data-ready="true"
          title="..."
        ></iframe>

        <div className="banner-text container-fluid col-lg-11">
          <div>
            <p className="mb-3 text-danger fw-bold">
              Test the Waters. Find Your iKon Today.
            </p>

            {/* <Row className="g-2 mb-2">
              <Col
                xs={12}
                md={4}
                lg={2}
                className="btn btn-light me-2"
                type="button"
              >
                Explore Models
              </Col>
              <Col
                xs={12}
                md={4}
                lg={2}
                className="btn btn-dark me-2"
                type="button"
              >
                Enquire Now
              </Col>
            </Row> */}
          </div>
        </div>
      </div>

      <div>
        <Container fluid className="col-lg-11">
          {/* <Row>
            <Col xs={12} md={6}>
              <div className="shadow-c1">
                <div class="card border-0">
                  <div class="row g-0">
                    <div class="col-md-7">
                      <img
                        src="https://ikonboats.com/wp-content/uploads/2023/04/ikon2023-4.jpg"
                        class="img-fluid"
                        alt="..."
                      />
                    </div>
                    <div class="col-md-5">
                      <div class="card-body">
                        <h6 class="text-dark fw-bold fs-5 text-c1">LX20</h6>
                        <p class="fs-6 fw-bold mb-1">
                          Why limit your potential? Upgrade to iKon
                        </p>
                        <p class="card-text mb-1">
                          Length: <span className="fw-bold">20’10”</span>
                        </p>

                        <div class="d-grid gap-2">
                          <button class="btn btn-light" type="button">
                            View Details
                          </button>
                          <button class="btn btn-c1" type="button">
                            Enquire Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="fs-18px bg-white p-2">
                  The LX20 by Ikon Boats is a versatile watercraft, blending
                  cutting-edge design, advanced technology, and exceptional
                  performance for unforgettable aquatic experiences.
                </p>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="shadow-c1">
                <div class="card border-0">
                  <div class="row g-0">
                    <div class="col-md-7">
                      <img
                        src="https://ikonboats.com/wp-content/uploads/2023/03/3-scaled.jpeg"
                        class="img-fluid"
                        alt="..."
                      />
                    </div>
                    <div class="col-md-5">
                      <div class="card-body">
                        <h6 class="text-dark fw-bold fs-5 text-c1">LX21</h6>
                        <p class="fs-6 fw-bold mb-1">
                          Step up to iKon - Where legacy meets innovation
                        </p>
                        <p class="card-text mb-1">
                          Length: <span className="fw-bold">21’10”</span>
                        </p>

                        <div class="d-grid gap-2">
                          <button class="btn btn-light" type="button">
                            View Details
                          </button>
                          <button class="btn btn-c1" type="button">
                            Enquire Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="fs-18px bg-white p-2">
                  The Ikon Boats LX21 boasts innovative design and
                  state-of-the-art features, delivering thrilling performance
                  and comfort for remarkable boating adventures on any water.
                </p>
              </div>
            </Col>
          </Row> */}
          <Row className="g-3 gradient-c2" style={{ fontFamily: "Roboto" }}>
            <Col xs={12} md={6}>
              <div className="p-3 m-2">
                <div>
                  <p className="text-white fw-bold my-2 mb-0">LX20</p>
                  <h2 className="text-white">World-Class Helm</h2>
                  <table className="mt-3 table table-striped table-hover fw-bold">
                    <tbody>
                      <tr>
                        <th scope="row" className="t-header">
                          Length
                        </th>
                        <td>20’10”</td>
                      </tr>
                      <tr>
                        <th scope="row" className="t-header">
                          Beam
                        </th>
                        <td>98”</td>
                      </tr>
                      <tr>
                        <th scope="row" className="t-header">
                          Fuel Capacity
                        </th>
                        <td>50 Gallons</td>
                      </tr>
                      <tr>
                        <th scope="row" className="t-header">
                          Livewell Capacity
                        </th>
                        <td>35 Gallons</td>
                      </tr>
                      <tr>
                        <th scope="row" className="t-header">
                          Rod Box Length
                        </th>
                        <td>9’8”</td>
                      </tr>
                    </tbody>
                  </table>
                  <span>
                    <button
                      className="text-white fs-5 bg-transparent border-0"
                      onClick={scrollToForm}
                    >
                      Enquire Now{"  "}
                    </button>
                    <i class="fa-solid fa-angles-right text-white"></i>
                  </span>
                </div>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="p-3 m-2">
                <img src={img1} alt="" className="img-fluid" />
              </div>
            </Col>
          </Row>
          <br />
          <Row className="g-3 gradient-c3 " style={{ fontFamily: "Roboto" }}>
            <Col xs={12} md={6}>
              <div className="p-3 m-2">
                <div>
                  <p className="text-white fw-bold my-2 mb-0">LX21</p>
                  <h2 className="text-white">Massive Machine Room</h2>
                  <table class="mt-3 table table-striped table-hover fw-bold">
                    <tbody>
                      <tr>
                        <th scope="row" class="t-header">
                          Length
                        </th>
                        <td>21’10”</td>
                      </tr>
                      <tr>
                        <th scope="row" class="t-header">
                          Beam
                        </th>
                        <td>98”</td>
                      </tr>
                      <tr>
                        <th scope="row" class="t-header">
                          Fuel Capacity
                        </th>
                        <td>50 Gallons</td>
                      </tr>
                      <tr>
                        <th scope="row" class="t-header">
                          Livewell Capacity
                        </th>
                        <td>35 Gallons</td>
                      </tr>
                      <tr>
                        <th scope="row" class="t-header">
                          Rod Box Length
                        </th>
                        <td>9’8”</td>
                      </tr>
                    </tbody>
                  </table>
                  <span>
                    <button
                      className="text-white fs-5 bg-transparent border-0"
                      onClick={scrollToForm}
                    >
                      Enquire Now{"  "}
                    </button>
                    <i class="fa-solid fa-angles-right text-white"></i>
                  </span>
                </div>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="p-3 m-2">
                <img src={img1} alt="" className="img-fluid" />
              </div>
            </Col>
          </Row>
          <br />
        </Container>

        <section
          className="c-contact-us"
          style={{ backgroundColor: "#ebf0f7" }}
        >
          <Container fluid className="col-lg-11 py-3">
            <div class="text-center">
              <h4 class="py-2 c-heading">Let's Get In Touch</h4>
              <hr class="hr-1" />
              <p>
                <small>
                  Send us a messages and we will get back to you as soon as
                  possible!
                </small>
              </p>
            </div>
            <Row>
              <Col md={12} lg={6} ref={formRef}>
                <Form onSubmit={handleSubmit}>
                  <Row className="g-2">
                    <Col lg={6}>
                      <Form.Group controlId="firstName">
                        <Form.Control
                          className="mb-2"
                          type="text"
                          placeholder="First Name"
                          name="NM_firstName"
                          value={formData.NM_firstName}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={6}>
                      <Form.Group controlId="lastName">
                        <Form.Control
                          className="mb-2"
                          type="text"
                          name="NM_lastName"
                          placeholder="Last Name"
                          value={formData.NM_lastName}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="g-2">
                    <Col lg={6}>
                      <Form.Group controlId="email">
                        <Form.Control
                          className="mb-2"
                          type="email"
                          placeholder="Email"
                          name="ID_email"
                          value={formData.ID_email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={6}>
                      <Form.Group controlId="phoneNumber">
                        <Form.Control
                          className="mb-2"
                          type="tel"
                          name="NO_phoneNumber"
                          placeholder="Phone (123) 456-7890"
                          value={formData.NO_phoneNumber}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="g-2">
                    <Col lg={4}>
                      <Form.Group controlId="city">
                        <Form.Control
                          className="mb-2"
                          type="text"
                          name="CD_city"
                          placeholder="City"
                          value={formData.CD_city}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group controlId="state">
                        <Form.Control
                          className="mb-2"
                          type="text"
                          placeholder="State"
                          name="CD_state"
                          value={formData.CD_state}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group controlId="country">
                        {/* Change controlId to "country" */}
                        <Form.Control
                          className="mb-2"
                          type="text"
                          name="CD_country"
                          value={formData.CD_country}
                          placeholder="Country"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group controlId="selectService">
                    <Form.Control
                      className="mb-2"
                      as="select"
                      required
                      value={formData.CA_category}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          CA_category: e.target.value,
                        });
                      }}
                    >
                      <option value="">Inquire About</option>
                      <option value="I want to build my own">
                        I want to build my own
                      </option>
                      <option value="Request Information">
                        Request Information
                      </option>
                      <option value="Inquire about Pricing and Inventory">
                        Inquire about Pricing and Inventory
                      </option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="comments">
                    <Form.Control
                      className="mb-2"
                      as="textarea"
                      placeholder="Leave your comments"
                      rows={3}
                      name="DS_comments1"
                      value={formData.DS_comments1}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="comments2">
                    <Form.Control
                      className="mb-2"
                      as="textarea"
                      rows={3}
                      name="DS_comments2"
                      placeholder="Do you currently own a boat? If so, what kind?"
                      value={formData.DS_comments2}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <div className="text-center">
                    <Button
                      className="btn custom-contact-btn text-uppercase"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </Col>
              <Col xs={12} md={12} lg={6} className="">
                <img src={my_img} alt="" className="img-fluid" />
                {/* src="https://hcbyachts.com/wp-content/uploads/2023/11/HCB-48-Rendering_White_StarboardStern-Transparetn-Website-1536x675.png" */}
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
};

export default IKON;
