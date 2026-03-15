import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";

const steps = [
  "Browse through completed home projects.",
  "Select a project you want to explore.",
  "Click the View in AR button.",
  "The AR camera opens and starts image tracking.",
  "Show the land image marker to your camera.",
  "The 3D house model appears on top of the marker on your screen.",
  "Walk around the model to observe its design and structural features.",
];

const ARExperiencePage = () => {
  const [projects, setProjects] = useState([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { data } = await api.get("/homes");
        setProjects(data.slice(0, 6));
      } catch (error) {
        setNote("Unable to load projects right now.");
      }
    };

    loadProjects();
  }, []);

  return (
    <section className="container section-space page-stack">
      <p className="eyebrow">AR Experience</p>
      <h2>Explore Homes with Immersive AR Walkthroughs</h2>
      <p className="muted-text">
        Open your camera, scan the marker image, and preview project models at real-world scale to
        understand elevation and form before finalizing decisions.
      </p>

      <div className="dashboard-grid top-gap">
        <article className="detail-card">
          <h3>Before You Start</h3>
          <ul className="bullet-list">
            <li>Keep good lighting on the marker image</li>
            <li>Hold camera steady while scanning</li>
            <li>Use the downloadable target image on AR page</li>
          </ul>
        </article>
        <article className="detail-card">
          <h3>What You Can Validate in AR</h3>
          <ul className="bullet-list">
            <li>Overall massing and proportions</li>
            <li>Visual style and exterior details</li>
            <li>Relative scale compared to surroundings</li>
          </ul>
        </article>
      </div>

      <div className="detail-card top-gap">
        <h3>How It Works</h3>
        <ol className="number-list">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="section-head top-gap">
        <h3>Start an AR Walkthrough</h3>
        <Link to="/completed-homes">Browse all projects</Link>
      </div>

      {note ? <p className="muted-text">{note}</p> : null}

      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project._id}>
            <img src={project.images?.[0]} alt={project.title} className="project-cover" />
            <div className="project-body">
              <h3>{project.title}</h3>
              <p className="project-meta">{project.location}</p>
              <div className="card-actions">
                <Link className="btn btn-solid" to={`/ar/${project.slug}`}>
                  View in AR
                </Link>
                <Link className="btn btn-outline" to={`/projects/${project.slug}`}>
                  Project Details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ARExperiencePage;
