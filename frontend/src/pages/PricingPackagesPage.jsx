import { Link } from "react-router-dom";

const packages = [
  {
    name: "Essential",
    price: "Starting at $95/sq.ft",
    forWho: "First-time home builders",
    points: [
      "Basic architecture + structural design",
      "Standard material package",
      "Stage-wise site updates",
      "1 completed-home AR reference mapping",
    ],
  },
  {
    name: "Signature",
    price: "Starting at $125/sq.ft",
    forWho: "Families needing premium finish",
    points: [
      "Custom floor plan and facade",
      "Premium interior finish options",
      "Dedicated project manager",
      "3 completed-home AR references",
    ],
    featured: true,
  },
  {
    name: "Luxe",
    price: "Starting at $160/sq.ft",
    forWho: "Large villas and bespoke homes",
    points: [
      "Full bespoke design + engineering",
      "Smart home and sustainability add-ons",
      "Weekly in-person progress reviews",
      "Unlimited AR reference walkthroughs",
    ],
  },
];

const PricingPackagesPage = () => {
  return (
    <section className="container section-space page-stack">
      <p className="eyebrow">Pricing Packages</p>
      <h2>Choose a Construction Plan That Matches Your Home Vision</h2>
      <p className="muted-text">
        Final pricing depends on location, soil condition, design complexity, and chosen materials.
      </p>

      <div className="pricing-grid top-gap">
        {packages.map((pkg) => (
          <article className={`pricing-card ${pkg.featured ? "pricing-featured" : ""}`} key={pkg.name}>
            <p className="eyebrow">{pkg.name}</p>
            <h3>{pkg.price}</h3>
            <p className="muted-text">{pkg.forWho}</p>
            <ul className="bullet-list top-gap">
              {pkg.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <Link
              className="btn btn-solid top-gap"
              to="/contact"
              state={{
                packageName: pkg.name,
                packagePrice: pkg.price,
                packageForWho: pkg.forWho,
              }}
            >
              Request Estimate
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PricingPackagesPage;
