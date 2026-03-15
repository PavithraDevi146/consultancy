import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../api/client";

const featureList = [
  "Augmented Reality Home Visualization",
  "Digital Portfolio of Completed Homes",
  "Interactive Client Experience",
  "Detailed Project Information",
  "Secure Client Dashboard",
];

const platformModules = [
  {
    title: "Completed Homes",
    description: "Explore house projects with location, construction area, and image galleries.",
    icon: "🏠"
  },
  {
    title: "Interior Design",
    description: "Browse room-wise concepts and submit consultation requirements.",
    icon: "🛋️"
  },
  {
    title: "AR Viewer",
    description: "Place 3D home models in your environment from supported mobile devices.",
    icon: "👁️‍🗨️"
  },
  {
    title: "Client Dashboard",
    description: "Save homes, track interior enquiries, and revisit AR-friendly projects.",
    icon: "📊"
  },
];

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [allHomes, setAllHomes] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [featuredRes, homesRes] = await Promise.all([
          api.get("/homes?featured=true"),
          api.get("/homes"),
        ]);
        setFeatured(featuredRes.data.slice(0, 4));
        setAllHomes(homesRes.data);
      } catch (err) {
        console.log("Error loading homes info on home page.", err);
      }
    };
    load();
  }, []);

  const tamilNaduHomes = allHomes
    .filter((home) => home.location?.toLowerCase().includes("tamil nadu"))
    .slice(0, 6);

  return (
    <div>
      <section className="hero-section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="eyebrow">BuildVision AR Platform</span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: '1.1' }}>
              Step Into Your Future <span style={{ color: 'var(--brand)' }}>Home</span> Before It's Built.
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', maxWidth: '600px' }}>
              We transform completed residential construction projects into immersive Augmented Reality experiences. Experience scale, design, and structure in your real environment.
            </p>
            <div className="hero-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link className="btn btn-solid" to="/completed-homes" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                Explore Projects
              </Link>
              <Link className="btn btn-outline" to="/ar-experience" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                Try AR Viewer
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="hero-panel"
            initial={{ opacity: 0, scale: 0.9, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
            transition={{
              duration: 1,
              delay: 0.2,
              type: "spring",
              y: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            style={{
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4))',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.8)',
              borderRadius: '24px',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-lift)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Decorative background glow for the panel */}
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--brand)', filter: 'blur(80px)', opacity: '0.3', borderRadius: '50%' }}></div>

            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', position: 'relative' }}>Why BuildVision?</h3>
            <p style={{ position: 'relative' }}>
              Evaluate architectural style and build quality interactively before initiating new projects.
            </p>
            <h4 className="top-gap" style={{ marginBottom: '1rem', color: 'var(--accent)' }}>Core Capabilities</h4>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}
            >
              {featureList.map((feature, i) => (
                <motion.li
                  key={feature}
                  variants={fadeUp}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.05rem' }}
                >
                  <span style={{ color: 'var(--brand)', fontSize: '1.2rem' }}>✓</span>
                  {feature}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>

      <section className="container section-space">
        <motion.div
          className="section-head"
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
        >
          <div>
            <span className="eyebrow">Ecosystem</span>
            <h2>Platform Modules</h2>
          </div>
          <Link to="/services">Explore full services &rarr;</Link>
        </motion.div>

        <motion.div
          className="project-grid"
          variants={staggerContainer}
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
        >
          {platformModules.map((module) => (
            <motion.article variants={fadeUp} className="detail-card" key={module.title}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{module.icon}</div>
              <h3>{module.title}</h3>
              <p className="muted-text">{module.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {(tamilNaduHomes.length > 0) && (
        <section className="container section-space">
          <motion.div
            className="section-head"
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          >
            <div>
              <span className="eyebrow">Regional</span>
              <h2>Tamil Nadu Homes</h2>
            </div>
            <Link to="/completed-homes">View complete list &rarr;</Link>
          </motion.div>

          <motion.div
            className="project-grid"
            variants={staggerContainer}
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          >
            {tamilNaduHomes.map((home) => (
              <motion.article variants={fadeUp} className="project-card" key={home._id}>
                <div style={{ overflow: 'hidden' }}>
                  <img src={home.images?.[0] || 'https://via.placeholder.com/400x300'} alt={home.title} className="project-cover" />
                </div>
                <div className="project-body">
                  <h3>{home.title}</h3>
                  <p className="project-meta">📍 {home.location}</p>
                  <div className="project-tags">
                    <span>{home.houseType}</span>
                    <span>{home.constructionArea} sq.ft</span>
                    <span>A/Y {home.yearCompleted}</span>
                  </div>
                  <div className="card-actions">
                    <Link className="btn btn-solid" to={`/ar/${home.slug}`}>
                      View in AR
                    </Link>
                    <Link className="btn btn-outline" to={`/projects/${home.slug}`}>
                      Details
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>
      )}

      {(featured.length > 0) && (
        <section className="container section-space">
          <motion.div
            className="section-head"
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          >
            <div>
              <span className="eyebrow">Showcase</span>
              <h2>Featured Projects</h2>
            </div>
            <Link to="/completed-homes">View all projects &rarr;</Link>
          </motion.div>
          <motion.div
            className="project-grid"
            variants={staggerContainer}
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          >
            {featured.map((project) => (
              <motion.article variants={fadeUp} className="project-card" key={project._id}>
                <div style={{ overflow: 'hidden' }}>
                  <img src={project.images?.[0] || 'https://via.placeholder.com/400x300'} alt={project.title} className="project-cover" />
                </div>
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p className="project-meta">📍 {project.location}</p>
                  <p className="muted-text">
                    Year Completed: {project.yearCompleted}
                  </p>
                  <div className="card-actions">
                    <Link className="btn btn-solid" to={`/ar/${project.slug}`}>
                      Launch AR View
                    </Link>
                    <Link className="btn btn-outline" to={`/projects/${project.slug}`}>
                      Project Profile
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>
      )}

      <section className="container section-space" style={{ paddingBottom: '8rem' }}>
        <motion.div
          className="cta-panel"
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
        >
          <span className="eyebrow" style={{ color: 'var(--brand)' }}>Ready to interact?</span>
          <h2>Experience Homes Like Never Before</h2>
          <p>
            Bridging the gap between architectural plans and physical reality. Don't just look at photos—walk through your potential future home today.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-solid" to="/completed-homes" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Browse Gallery
            </Link>
            <Link className="btn btn-outline" to="/contact" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', backgroundColor: 'rgba(255,255,255,0.05)' }}>
              Contact Sales
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
