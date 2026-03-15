import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import api from "../api/client";

const extractCity = (location = "") => {
  const parts = location.split(",").map((part) => part.trim());
  return parts[0] || "Unknown";
};

const ProjectsByCityPage = () => {
  const [projects, setProjects] = useState([]);
  const [activeCity, setActiveCity] = useState("All");

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get("/homes");
      setProjects(data);
    };

    load();
  }, []);

  const grouped = useMemo(() => {
    return projects.reduce((acc, project) => {
      const city = extractCity(project.location);
      if (!acc[city]) acc[city] = [];
      acc[city].push(project);
      return acc;
    }, {});
  }, [projects]);

  const cities = useMemo(() => ["All", ...Object.keys(grouped).sort()], [grouped]);

  return (
    <section className="container section-space page-stack">
      <p className="eyebrow">Projects by City</p>
      <h2>Explore Completed Homes City-Wise</h2>
      <div className="city-tabs top-gap">
        {cities.map((city) => (
          <button
            type="button"
            className={`city-tab ${activeCity === city ? "city-tab-active" : ""}`}
            key={city}
            onClick={() => setActiveCity(city)}
          >
            {city}
          </button>
        ))}
      </div>

      <div className="city-grid top-gap">
        {(activeCity === "All" ? Object.entries(grouped) : [[activeCity, grouped[activeCity] || []]]).map(
          ([city, cityProjects]) => (
            <article className="detail-card" key={city}>
              <div className="section-head">
                <h3>{city}</h3>
                <span className="pill">{cityProjects.length} homes</span>
              </div>
              <div className="status-list top-gap">
                {cityProjects.map((project) => (
                  <div className="status-item" key={project._id}>
                    <p>
                      <strong>{project.title}</strong>
                    </p>
                    <p className="muted-text">
                      {project.houseType} | {project.constructionArea} sq.ft | {project.yearCompleted}
                    </p>
                    <div className="card-actions">
                      <Link className="btn btn-solid" to={`/ar/${project.slug}`}>
                        AR View
                      </Link>
                      <Link className="btn btn-outline" to={`/projects/${project.slug}`}>
                        Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          )
        )}
      </div>
    </section>
  );
};

export default ProjectsByCityPage;
