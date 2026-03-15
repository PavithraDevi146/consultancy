import { useEffect, useMemo, useState } from "react";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

const FALLBACK_IMAGE = "https://via.placeholder.com/1200x800?text=Image+Unavailable";

const roomTypes = ["", "Living Room", "Bedroom", "Kitchen", "Dining Area", "Office Room"];

const categoryElements = {
  "Living Room": ["TV Unit", "Accent Wall", "Sofa Layout", "Layered Lighting", "Storage Console"],
  Bedroom: ["Wardrobe", "Headboard Panel", "Side Tables", "Ambient Lights", "Study Nook"],
  Kitchen: ["Tall Unit", "Hob & Chimney", "Countertop", "Drawer Systems", "Breakfast Counter"],
  "Dining Area": ["Dining Set", "Crockery Unit", "Pendant Lighting", "Wall Art", "Wash Counter"],
  "Office Room": ["Work Desk", "Ergonomic Chair", "Acoustic Panels", "Bookshelf", "Task Lighting"],
};

const categoryTips = {
  "Living Room": "Focus on circulation flow, TV viewing distance, and layered lighting.",
  Bedroom: "Blend privacy, storage planning, and calming material palette.",
  Kitchen: "Optimize work triangle and vertical utility for long-term use.",
  "Dining Area": "Balance movement space and focal lighting around the dining zone.",
  "Office Room": "Prioritize acoustics, posture comfort, and daylight glare control.",
};

const initialForm = {
  name: "",
  email: "",
  phone: "",
  city: "",
  interiorType: "Living Room",
  budget: "",
  message: "",
};

const InteriorDesignPage = () => {
  const { user } = useAuth();
  const [interiors, setInteriors] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [form, setForm] = useState(initialForm);
  const [note, setNote] = useState("");

  useEffect(() => {
    const loadInteriors = async () => {
      const query = selectedRoomType ? `?roomType=${encodeURIComponent(selectedRoomType)}` : "";
      const { data } = await api.get(`/interiors${query}`);
      setInteriors(data);
    };

    loadInteriors().catch(() => setNote("Could not load interior designs right now."));
  }, [selectedRoomType]);

  useEffect(() => {
    if (!user) return;
    setForm((prev) => ({
      ...prev,
      name: prev.name || user.name,
      email: prev.email || user.email,
    }));
  }, [user]);

  const grouped = useMemo(() => {
    return interiors.reduce((acc, item) => {
      if (!acc[item.roomType]) acc[item.roomType] = [];
      acc[item.roomType].push(item);
      return acc;
    }, {});
  }, [interiors]);

  const roomTypesWithoutAll = roomTypes.filter(Boolean);

  const onSubmit = async (e) => {
    e.preventDefault();
    setNote("");

    try {
      await api.post("/interior-enquiry", form);
      setNote("Interior enquiry submitted. Our team will contact you soon.");
      setForm((prev) => ({
        ...initialForm,
        name: user?.name || "",
        email: user?.email || "",
      }));
    } catch (error) {
      setNote(error?.response?.data?.message || "Unable to submit enquiry right now.");
    }
  };

  const getPrimaryImage = (images) => {
    if (!Array.isArray(images) || !images.length) return FALLBACK_IMAGE;
    return images[0] || FALLBACK_IMAGE;
  };

  const handleInteriorImageError = (e, images) => {
    const safeImages = Array.isArray(images) ? images.filter(Boolean) : [];
    const currentIndex = Number(e.currentTarget.dataset.index || "0");
    const nextIndex = currentIndex + 1;

    if (nextIndex < safeImages.length) {
      e.currentTarget.dataset.index = String(nextIndex);
      e.currentTarget.src = safeImages[nextIndex];
      return;
    }

    e.currentTarget.onerror = null;
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <section className="container section-space page-stack">
      <p className="eyebrow">Interior Design</p>
      <h2>Interior Design Gallery & Expert Consultation</h2>
      <p className="muted-text">
        Explore curated room-wise concepts, compare design elements, and submit a personalized
        interior enquiry in minutes.
      </p>

      <div className="dashboard-grid top-gap">
        <article className="detail-card">
          <h3>Plan Better by Room Type</h3>
          <p className="muted-text">
            Filter by room to review ideas that match your layout and lifestyle before finalizing
            material and furniture decisions.
          </p>
          <div className="project-tags">
            <span>Living Room</span>
            <span>Bedroom</span>
            <span>Kitchen</span>
            <span>Dining Area</span>
            <span>Office Room</span>
          </div>
        </article>
        <article className="detail-card">
          <h3>What We Help You Finalize</h3>
          <ul className="bullet-list">
            <li>Space planning and furniture layout</li>
            <li>Storage optimization and utility flow</li>
            <li>Lighting mood and material palette</li>
            <li>Budget-friendly design alternatives</li>
          </ul>
        </article>
      </div>

      <div className="filter-row top-gap">
        <select
          className="input"
          value={selectedRoomType}
          onChange={(e) => setSelectedRoomType(e.target.value)}
        >
          {roomTypes.map((type) => (
            <option key={type || "all"} value={type}>
              {type || "All room categories"}
            </option>
          ))}
        </select>
      </div>

      <div className="top-gap page-stack">
        {roomTypesWithoutAll.map((roomType) => (
          <article key={roomType} className="detail-card">
            <h3>{roomType}</h3>
            <p className="muted-text">{categoryTips[roomType]}</p>
            <div className="project-tags top-gap">
              {categoryElements[roomType].map((element) => (
                <span key={element}>{element}</span>
              ))}
            </div>
            <div className="project-grid top-gap">
              {(grouped[roomType] || []).map((item) => (
                <div className="project-card" key={item._id}>
                  <img
                    src={getPrimaryImage(item.images)}
                    data-index="0"
                    alt={item.title}
                    className="project-cover"
                    onError={(e) => handleInteriorImageError(e, item.images)}
                  />
                  <div className="project-body">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <p className="muted-text">Style: {item.designStyle}</p>
                    <div className="project-tags">
                      {categoryElements[roomType].slice(0, 3).map((element) => (
                        <span key={`${item._id}-${element}`}>{element}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              {!grouped[roomType]?.length ? (
                <article className="detail-card">
                  <h4>{roomType} concepts coming soon</h4>
                  <p className="muted-text">
                    More examples for {roomType.toLowerCase()} are being added by the design team.
                  </p>
                </article>
              ) : null}
            </div>
          </article>
        ))}
        {!interiors.length ? <p className="muted-text">No interior designs available yet.</p> : null}
      </div>

      <form className="detail-card top-gap" onSubmit={onSubmit}>
        <h3>Book an Interior Consultation</h3>
        <p className="muted-text">
          Share your room type, city, and budget range. Our team will connect with a practical
          design direction and execution plan.
        </p>
        {note ? <p className="muted-text">{note}</p> : null}
        <div className="form-grid-two">
          <input
            className="input"
            placeholder="Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="input"
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="form-grid-two">
          <input
            className="input"
            placeholder="Phone"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            className="input"
            placeholder="City"
            required
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
        </div>
        <div className="form-grid-two">
          <select
            className="input"
            value={form.interiorType}
            onChange={(e) => setForm({ ...form, interiorType: e.target.value })}
          >
            {roomTypes.filter(Boolean).map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          <input
            className="input"
            placeholder="Budget"
            required
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
          />
        </div>
        <textarea
          className="input"
          rows={4}
          placeholder="Message"
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <button className="btn btn-solid" type="submit">
          Submit Interior Enquiry
        </button>
      </form>
    </section>
  );
};

export default InteriorDesignPage;
