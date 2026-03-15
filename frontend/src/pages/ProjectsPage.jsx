import { useEffect, useState } from "react";
import api from "../api/client";
import ProjectCard from "../components/ProjectCard";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [houseType, setHouseType] = useState("");

  useEffect(() => {
    const load = async () => {
      const q = new URLSearchParams();
      if (search) q.set("search", search);
      if (houseType) q.set("houseType", houseType);
      const { data } = await api.get(`/homes?${q.toString()}`);
      const filtered = houseType ? data.filter((item) => item.houseType === houseType) : data;
      setProjects(filtered);
    };

    const timer = setTimeout(load, 300);
    return () => clearTimeout(timer);
  }, [search, houseType]);

  return (
    <section className="container section-space page-stack">
      <p className="eyebrow">Completed Homes</p>
      <div className="section-head">
        <h2>Completed Homes (AR Enabled)</h2>
      </div>
      <p className="muted-text">
        Discover completed residential projects, filter by type and city, then launch AR to view
        the home model in your real-world environment.
      </p>

      <div className="dashboard-grid top-gap">
        <article className="detail-card">
          <h3>Why Explore These Homes?</h3>
          <ul className="bullet-list">
            <li>Real completed project references</li>
            <li>Detailed galleries and specifications</li>
            <li>AR walkthrough for spatial understanding</li>
          </ul>
        </article>
        <article className="detail-card">
          <h3>Quick Tips</h3>
          <ul className="bullet-list">
            <li>Use search to find projects by location</li>
            <li>Filter by house type for faster selection</li>
            <li>Use View in AR to compare scale and form</li>
          </ul>
        </article>
      </div>

      <div className="filter-row">
        <input
          className="input"
          placeholder="Search by project name or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="input" value={houseType} onChange={(e) => setHouseType(e.target.value)}>
          <option value="">All house types</option>
          <option value="Villa">Villa</option>
          <option value="Duplex">Duplex</option>
          <option value="Independent House">Independent House</option>
          <option value="Apartment">Apartment</option>
        </select>
      </div>

      <article className="detail-card top-gap">
        <h3>Project Library Snapshot</h3>
        <p>
          Every project includes title, location, area details, image gallery, and AR model access
          so you can evaluate design quality before starting your own construction journey.
        </p>
        <ul className="bullet-list">
          <li>Project details and location</li>
          <li>Image gallery preview</li>
          <li>AR launch for 3D model placement</li>
        </ul>
      </article>

      <div className="project-grid top-gap">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsPage;
