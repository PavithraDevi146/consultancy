import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FALLBACK_IMAGE = "https://via.placeholder.com/1200x800?text=Image+Unavailable";

const ProjectCard = ({ project }) => {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={project.images?.[0] || FALLBACK_IMAGE}
        alt={project.title}
        className="project-cover"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = FALLBACK_IMAGE;
        }}
      />
      <div className="project-body">
        <p className="project-meta">{project.location}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          <span>{project.houseType}</span>
          <span>{project.yearCompleted}</span>
          <span>{project.constructionArea} sq.ft</span>
          {project.featured ? <span>Featured</span> : null}
        </div>
        <div className="card-actions">
          <Link className="btn btn-solid" to={`/ar/${project.slug}`}>
            View in AR
          </Link>
          <Link className="btn btn-outline" to={`/projects/${project.slug}`}>
            Project Details
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
