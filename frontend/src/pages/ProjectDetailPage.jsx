import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client";

const FALLBACK_IMAGE = "https://via.placeholder.com/1200x800?text=Image+Unavailable";

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/homes/${slug}`);
        setProject(data);
      } catch (err) {
        setError("Project not found");
      }
    };
    load();
  }, [slug]);

  if (error) return <section className="container section-space">{error}</section>;
  if (!project) return <section className="container section-space">Loading project...</section>;

  return (
    <section className="container section-space">
      <h2>{project.title}</h2>
      <p className="project-meta">
        {project.houseType} | {project.location} | Completed {project.yearCompleted}
      </p>
      <p>{project.description}</p>
      <div className="spec-grid top-gap">
        <div className="status-item">
          <p className="muted-text">House Type</p>
          <strong>{project.houseType}</strong>
        </div>
        <div className="status-item">
          <p className="muted-text">Area</p>
          <strong>{project.constructionArea} sq.ft</strong>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <h3>AR 3D Home Walkthrough</h3>
          <p className="muted-text">
            Rotate on desktop. On mobile, tap AR mode to place this home model in your space.
          </p>
          {project.model3D ? (
            <model-viewer
              src={project.model3D}
              ar
              ar-modes="scene-viewer webxr quick-look"
              camera-controls
              auto-rotate
              class="ar-viewer"
              alt={project.title}
            ></model-viewer>
          ) : (
            <p>AR preview currently unavailable for this project.</p>
          )}
        </div>

        <div className="detail-card">
          <h3>Project image gallery</h3>
          <div className="gallery-grid">
            {project.images?.map((img) => (
              <img
                key={img}
                src={img || FALLBACK_IMAGE}
                alt={`${project.title} visual`}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailPage;
