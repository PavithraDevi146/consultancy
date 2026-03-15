import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/client";

const DEFAULT_MIND_SRC  = "/land.mind";
const DEFAULT_MODEL_SRC = "/models/house_3_floors.glb";
const DEFAULT_MARKER    = "/land.png";

const ARViewerPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    api.get(`/homes/${slug}`)
      .then(({ data }) => setProject(data))
      .catch(() =>
        setProject({
          title: "AR House Viewer",
          slug,
          model3D: DEFAULT_MODEL_SRC,
          arMarkerImage: DEFAULT_MARKER,
          arTargetSrc: DEFAULT_MIND_SRC,
        })
      );
  }, [slug]);

  if (!project) {
    return <section className="ar-page-wrap">Loading AR viewer...</section>;
  }

  const mindSrc  = project.arTargetSrc || DEFAULT_MIND_SRC;
  const modelSrc = project.model3D     || DEFAULT_MODEL_SRC;
  const marker   = project.arMarkerImage || DEFAULT_MARKER;

  const params = new URLSearchParams({ mind: mindSrc, model: modelSrc });
  const iframeSrc = `/ar-viewer.html?${params.toString()}`;

  return (
    <section className="ar-page-wrap">
      <div className="ar-top-bar">
        <Link className="btn btn-outline" to="/projects">
          Back
        </Link>
        <h3>{project.title}</h3>
      </div>

      <div className="ar-stage">
        <iframe
          key={iframeSrc}
          src={iframeSrc}
          title="AR Viewer"
          allow="camera; microphone; accelerometer; gyroscope; magnetometer; xr-spatial-tracking"
          allowFullScreen
          className="ar-camera-scene"
          style={{ border: "none" }}
        ></iframe>
      </div>

      <div className="ar-marker-card">
        <p className="muted-text">Show this image to the camera:</p>
        <img className="ar-marker-image" src={marker} alt="AR target marker" />
        <a
          className="btn btn-solid"
          href={marker}
          download="ar-target-marker.png"
          style={{ display: "inline-block", marginTop: "1rem" }}
        >
          Download Target Image
        </a>
      </div>
    </section>
  );
};

export default ARViewerPage;
