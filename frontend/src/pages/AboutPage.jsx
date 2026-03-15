import { Link } from "react-router-dom";

const companyValues = [
  "Quality-first construction standards",
  "Transparent timelines and communication",
  "Functional planning for everyday living",
  "Technology-enabled client experience",
];

const buildProcess = [
  "Requirement discussion and budget planning",
  "Design visualization and material selection",
  "Execution with milestone-based updates",
  "Final walkthrough and handover support",
];

const AboutPage = () => {
  return (
    <section className="container section-space page-stack">
      <p className="eyebrow">About Us</p>
      <h2>Construction Expertise Powered by BuildVision AR</h2>
      <p className="muted-text" style={{ maxWidth: "760px" }}>
        We build modern residential homes and present them through immersive digital
        experiences, helping clients understand space, quality, and design before making
        decisions.
      </p>

      <div className="dashboard-grid top-gap">
        <div className="detail-card">
          <h3>Who We Are</h3>
          <p>
            Our team specializes in delivering premium homes that balance aesthetics,
            structural durability, and practical layouts. We focus on clear communication and
            dependable execution from start to finish.
          </p>
          <div className="project-tags top-gap">
            <span>Residential Projects</span>
            <span>Premium Finishes</span>
            <span>On-Time Delivery</span>
          </div>
        </div>

        <div className="detail-card">
          <h3>BuildVision AR</h3>
          <p>
            BuildVision AR converts static project presentation into interactive walkthroughs.
            Clients can view completed homes as 3D models through AR to better evaluate
            proportions, structure, and design details.
          </p>
          <div className="card-actions">
            <Link className="btn btn-solid" to="/ar-experience">
              Try AR Experience
            </Link>
            <Link className="btn btn-outline" to="/projects">
              View Projects
            </Link>
          </div>
        </div>
      </div>

      <div className="detail-grid top-gap">
        <div className="detail-card">
          <h3>Vision</h3>
          <p>
            To transform how construction companies present completed homes using intuitive,
            high-trust digital experiences.
          </p>
          <h3 className="top-gap">Mission</h3>
          <ul className="bullet-list">
            <li>Provide immersive project visualization</li>
            <li>Improve transparency between company and clients</li>
            <li>Enhance the overall home selection journey</li>
          </ul>
        </div>

        <div className="detail-card">
          <h3>Core Values</h3>
          <ul className="bullet-list">
            {companyValues.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>

          <h3 className="top-gap">How We Work</h3>
          <ol className="number-list">
            {buildProcess.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="cta-panel top-gap">
        <p className="eyebrow">Let’s Build Together</p>
        <h2>Plan Your Dream Home with Confidence</h2>
        <p>
          Explore completed homes, inspect details in AR, and connect with our team for a
          tailored plan based on your location, style, and budget.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-solid" to="/contact">
            Contact Us
          </Link>
          <Link className="btn btn-outline" to="/pricing">
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
