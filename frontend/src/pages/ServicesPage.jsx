import { Link } from "react-router-dom";

const offerings = [
  {
    title: "Residential Construction",
    description:
      "End-to-end home construction with quality materials, transparent milestones, and site-supervised execution.",
    points: ["Foundation to handover", "Quality checks at every phase", "Timeline-focused delivery"],
  },
  {
    title: "Architectural Design",
    description:
      "Space-efficient floor plans and facades tailored to your family lifestyle, budget, and plot constraints.",
    points: ["Plan optimization", "Ventilation and daylight focus", "Modern + practical design"],
  },
  {
    title: "Project Consultation",
    description:
      "Technical consultation before construction starts to reduce rework, control costs, and improve outcomes.",
    points: ["Scope planning", "Budget guidance", "Execution roadmap"],
  },
  {
    title: "Digital AR Visualization",
    description:
      "Preview completed homes in AR to understand scale, elevation, and visual quality before final decisions.",
    points: ["Marker-based AR walkthrough", "Mobile and desktop camera support", "Real-world model placement"],
  },
];

const ServicesPage = () => {
  return (
    <section className="container section-space page-stack">
      <p className="eyebrow">Services</p>
      <h2>Build, Design, and Visualize with Confidence</h2>
      <p className="muted-text">
        We combine construction expertise with digital visualization so you can plan better, avoid
        uncertainty, and build a home that matches your vision.
      </p>

      <div className="dashboard-grid top-gap">
        <article className="detail-card">
          <h3>What You Get</h3>
          <div className="project-tags">
            <span>Single point ownership</span>
            <span>Transparent progress</span>
            <span>Technical guidance</span>
            <span>AR-ready project preview</span>
          </div>
          <p className="muted-text">
            From early planning to project completion, our team handles architecture, construction,
            and walkthrough support in a connected workflow.
          </p>
        </article>

        <article className="detail-card">
          <h3>How We Work</h3>
          <ol className="number-list">
            <li>Requirement and plot understanding</li>
            <li>Design proposal and estimate alignment</li>
            <li>Construction with milestone tracking</li>
            <li>Handover with quality walkthrough</li>
          </ol>
        </article>
      </div>

      <div className="services-grid top-gap">
        {offerings.map((item) => (
          <article className="detail-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <ul className="bullet-list">
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <article className="detail-card top-gap">
        <h3>Ready to Start Your Project?</h3>
        <p className="muted-text">
          Share your plot details, preferred style, and budget. We will guide you with a practical
          plan and next steps.
        </p>
        <div className="card-actions">
          <Link className="btn btn-solid" to="/contact">
            Talk to Our Team
          </Link>
          <Link className="btn btn-outline" to="/ar-experience">
            Explore AR Experience
          </Link>
        </div>
      </article>
    </section>
  );
};

export default ServicesPage;
