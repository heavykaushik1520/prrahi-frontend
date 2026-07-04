import React, { useState, useRef } from "react";
import CareerTopBanner from "../components/top/CareerTopBanner";
import { Toast, ToastContainer } from "react-bootstrap";

function CareerPage() {
  const [formData, setFormData] = useState({
    name: "",
    currentDesignation: "",
    currentOrg: "",
    totalExp: "",
    categoryExp: "",
    whyShouldWeHireYou: "",
  });
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "success",
  });

  // ref for file input
  const fileInputRef = useRef(null);

  const showToast = (message, bg = "success") => {
    setToast({ show: true, message, bg });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setCvFile(null);
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setCvFile(null);
      // clear actual input value as well
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      showToast("Please upload only PDF or Word documents.", "danger");
      return;
    }

    setCvFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cvFile) {
      showToast("Please upload your CV.", "danger");
      return;
    }

    try {
      setLoading(true);

      const body = new FormData();
      body.append("name", formData.name);
      body.append("currentDesignation", formData.currentDesignation);
      body.append("currentOrg", formData.currentOrg);
      body.append("totalExp", formData.totalExp);
      body.append("categoryExp", formData.categoryExp);
      body.append("whyShouldWeHireYou", formData.whyShouldWeHireYou);
      body.append("uploadCV", cvFile); // must match multer .single("uploadCV")

      const res = await fetch("https://prrahi.in/api/api/career", {
        method: "POST",
        body,
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.message || "Something went wrong.", "danger");
      } else {
        showToast("Application submitted successfully!", "success");

        // reset form
        setFormData({
          name: "",
          currentDesignation: "",
          currentOrg: "",
          totalExp: "",
          categoryExp: "",
          whyShouldWeHireYou: "",
        });
        setCvFile(null);

        // clear file input value from DOM
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (err) {
      console.error(err);
      showToast("Error submitting the form.", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toast in the middle of the viewport */}
      <ToastContainer
        position="bottom-center"
        className="p-3"
        style={{ zIndex: 2000 }}
      >
        <Toast
          onClose={() => setToast((t) => ({ ...t, show: false }))}
          show={toast.show}
          delay={4000}
          autohide
          bg={toast.bg}
        >
          <Toast.Body className="text-white text-center">
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Full-page loader overlay */}
      {loading && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1500,
          }}
        >
          <div className="bg-white p-4 rounded shadow d-flex flex-column align-items-center">
            <div className="spinner-border mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mb-0">Submitting your application...</p>
          </div>
        </div>
      )}

      <CareerTopBanner />

      <div className="container py-5">
        <div className="row g-4 align-items-top">
          {/* LEFT TEXT */}
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 ">
                <h2
                  className="h3 mb-3"
                  style={{
                    color: "#ff9500",
                  }}
                >
                  Join{" "}
                  <span
                    style={{
                      color: "#ec1b26",
                    }}
                  >
                    PrRaHi Agarbatti
                  </span>{" "}
                  — Where Future Leaders are Made!
                </h2>
                <p
                  className="mb-3"
                  style={{
                    color: "#666",
                  }}
                >
                  A vibrant startup backed by a powerful conglomerate, PrRaHi
                  Agarbatti began its inspiring journey in the Northeast and is
                  now serving customers across India with global aspirations
                  ahead.
                </p>
                <p
                  className="mb-3"
                  style={{
                    color: "#666",
                  }}
                >
                  With a visionary management team bringing 100+ years of
                  collective corporate experience, we believe our real strength
                  lies in smart, driven professionals.
                </p>
                <p className="fw-semibold mb-0">
                  If you’re ready to grow, lead, and win with us, fill out the
                  form and take your first step toward an exciting future with
                  PrRaHi!
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 ">
                <h2
                  className="text-center mb-4"
                  style={{
                    color: "#ff9500",
                  }}
                >
                  APPLICATION
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Current Designation
                        </label>
                        <input
                          name="currentDesignation"
                          value={formData.currentDesignation}
                          onChange={handleChange}
                          type="text"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12 col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Current Organization
                        </label>
                        <input
                          name="currentOrg"
                          value={formData.currentOrg}
                          onChange={handleChange}
                          type="text"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Total Experience (years)
                        </label>
                        <input
                          name="totalExp"
                          value={formData.totalExp}
                          onChange={handleChange}
                          type="number"
                          min="0"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12 col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Category Experience (years)
                        </label>
                        <input
                          name="categoryExp"
                          value={formData.categoryExp}
                          onChange={handleChange}
                          type="number"
                          min="0"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Why should we hire you?
                    </label>
                    <textarea
                      name="whyShouldWeHireYou"
                      value={formData.whyShouldWeHireYou}
                      onChange={handleChange}
                      rows={4}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Upload CV (PDF / Word)</label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="form-control"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn contact-submit-button w-100 py-2"
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CareerPage;
