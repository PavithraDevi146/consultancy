import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/client";

const contactHighlights = [
  "Free initial consultation",
  "Estimate and timeline guidance",
  "Support for construction + interiors",
  "AR-based design walkthrough assistance",
];

const ContactPage = () => {
  const location = useLocation();
  const selectedPackage = location.state;
  const [note, setNote] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (!selectedPackage?.packageName) return;

    setForm((prev) => ({
      ...prev,
      message:
        prev.message ||
        `I am interested in the ${selectedPackage.packageName} package (${selectedPackage.packagePrice}). Please share detailed estimate and next steps.`,
    }));
  }, [selectedPackage]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setNote("");

    try {
      await api.post("/contact", form);
      setNote("Thanks. Our team will contact you soon.");
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      setNote(error?.response?.data?.message || "Unable to submit now.");
    }
  };

  return (
    <section className="container section-space page-stack">
      <p className="eyebrow">Contact Us</p>
      <h2>Let’s Plan Your Dream Home</h2>
      <p className="muted-text">
        Share your requirements and our team will get back with a practical estimate, timeline,
        and recommended next steps.
      </p>

      <div className="project-tags top-gap">
        {contactHighlights.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className="dashboard-grid top-gap">
        <form className="detail-card" onSubmit={onSubmit}>
          <h3>Project Enquiry Form</h3>
          {note ? <p className="muted-text">{note}</p> : null}
          <input
            className="input"
            placeholder="Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="input"
            placeholder="Email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="input"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <textarea
            className="input"
            placeholder="Message"
            rows={5}
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <button className="btn btn-solid" type="submit">Submit</button>
        </form>

        <div className="detail-card">
          <h3>Contact Information</h3>
          <p><strong>Company:</strong> Construction & Infrastructure Solutions</p>
          <p><strong>Address:</strong> 24 Lake View Road, Coimbatore, Tamil Nadu</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Email:</strong> info@buildvisionar.com</p>
          <p><strong>Working Hours:</strong> Mon-Sat, 9:30 AM - 6:30 PM</p>
          <p><strong>Service City:</strong> Coimbatore, India</p>

          <div className="status-list">
            <div className="status-item">
              <p className="muted-text">Typical Response Time</p>
              <h4>Within 24 Hours</h4>
            </div>
            <div className="status-item">
              <p className="muted-text">Best Time to Call</p>
              <h4>10:00 AM - 5:30 PM</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
