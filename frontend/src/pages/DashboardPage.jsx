import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";
import MetricCard from "../components/MetricCard";

const DashboardPage = () => {
  const { user } = useAuth();
  const [homes, setHomes] = useState([]);
  const [savedHomes, setSavedHomes] = useState([]);
  const [myEnquiries, setMyEnquiries] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    city: "",
    interiorType: "Living Room",
    budget: "",
    message: "",
  });
  const [note, setNote] = useState("");

  useEffect(() => {
    const load = async () => {
      const [homesRes, savedRes, enquiriesRes, updatesRes] = await Promise.all([
        api.get("/homes?featured=true"),
        api.get("/saved-homes"),
        api.get("/interior-enquiry/mine"),
        api.get("/site-updates"),
      ]);

      setHomes(homesRes.data);
      setSavedHomes(savedRes.data);
      setMyEnquiries(enquiriesRes.data);
      setUpdates(updatesRes.data);
    };

    load().catch(() => setNote("Some dashboard modules could not load."));
  }, []);

  const openEnquiryCount = useMemo(
    () => myEnquiries.filter((item) => item.status !== "Closed").length,
    [myEnquiries]
  );

  const submitEnquiry = async (e) => {
    e.preventDefault();
    setNote("");

    try {
      await api.post("/interior-enquiry/mine", form);
      setNote("Interior enquiry submitted successfully.");
      const mine = await api.get("/interior-enquiry/mine");
      setMyEnquiries(mine.data);
      setForm((prev) => ({
        ...prev,
        phone: "",
        city: "",
        budget: "",
        message: "",
      }));
    } catch (err) {
      setNote(err?.response?.data?.message || "Could not submit enquiry");
    }
  };

  const saveHome = async (homeId) => {
    try {
      const { data } = await api.post("/saved-homes", { homeId });
      setSavedHomes(data);
      setNote("Home saved to your dashboard.");
    } catch (error) {
      setNote(error?.response?.data?.message || "Unable to save home.");
    }
  };

  const removeSavedHome = async (homeId) => {
    try {
      const { data } = await api.delete(`/saved-homes/${homeId}`);
      setSavedHomes(data);
    } catch (error) {
      setNote(error?.response?.data?.message || "Unable to remove saved home.");
    }
  };

  return (
    <section className="container section-space">
      <h2>Client Dashboard</h2>
      <p className="muted-text">
        Dashboard overview for saved projects, AR viewing, project inquiry, and profile-linked
        activity.
      </p>

      <div className="dashboard-grid top-gap">
        <div className="detail-card">
          <h3>Dashboard Features</h3>
          <div className="metrics-grid">
            <MetricCard label="Interior Enquiries" value={myEnquiries.length} />
            <MetricCard label="Open Enquiries" value={openEnquiryCount} />
            <MetricCard label="Saved Projects" value={savedHomes.length} />
          </div>
        </div>

        <div className="detail-card">
          <h3>My Profile</h3>
          <div className="status-list">
            <div className="status-item">
              <p><strong>Name</strong></p>
              <p className="muted-text">{user?.name}</p>
            </div>
            <div className="status-item">
              <p><strong>Email</strong></p>
              <p className="muted-text">{user?.email}</p>
            </div>
            <div className="status-item">
              <p><strong>Role</strong></p>
              <p className="muted-text">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid top-gap">
        <form className="detail-card" onSubmit={submitEnquiry}>
          <h3>Interior Enquiry</h3>
          {note ? <p className="muted-text">{note}</p> : null}
          <input
            className="input"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="input"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="input"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <input
            className="input"
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            required
          />
          <select
            className="input"
            value={form.interiorType}
            onChange={(e) => setForm({ ...form, interiorType: e.target.value })}
          >
            <option>Living Room</option>
            <option>Bedroom</option>
            <option>Kitchen</option>
            <option>Dining Area</option>
            <option>Office Room</option>
          </select>
          <input
            className="input"
            placeholder="Budget range"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            required
          />
          <textarea
            className="input"
            placeholder="Describe style preference, timeline, and requirements"
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <button className="btn btn-solid" type="submit">
            Submit Interior Enquiry
          </button>
        </form>

        <div className="detail-card">
          <h3>Interior Enquiries</h3>
          <div className="status-list">
            {myEnquiries.map((item) => (
              <div className="status-item" key={item._id}>
                <p>
                  <strong>{item.interiorType}</strong> | {item.budget}
                </p>
                <p className="muted-text">{item.city}</p>
                <p className="muted-text">{item.status}</p>
              </div>
            ))}
            {!myEnquiries.length ? <p>No interior enquiries yet.</p> : null}
          </div>
        </div>
      </div>

      <div className="dashboard-grid top-gap">
        <div className="detail-card">
          <h3>Saved Projects</h3>
          <div className="status-list">
            {savedHomes.map((home) => (
              <div className="status-item" key={home._id}>
                <p><strong>{home.title}</strong></p>
                <p className="muted-text">{home.location}</p>
                <div className="card-actions">
                  <Link className="btn btn-outline" to={`/ar/${home.slug}`}>
                    Launch AR
                  </Link>
                  <button
                    className="btn btn-solid"
                    type="button"
                    onClick={() => removeSavedHome(home._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            {!savedHomes.length ? <p className="muted-text">No saved homes yet.</p> : null}
          </div>
        </div>

        <div className="detail-card">
          <h3>AR Homes</h3>
          <div className="status-list">
            {homes.map((home) => (
              <div className="status-item" key={home._id}>
                <p><strong>{home.title}</strong></p>
                <p className="muted-text">{home.location} | {home.yearCompleted}</p>
                <div className="card-actions">
                  <Link className="btn btn-outline" to={`/ar/${home.slug}`}>
                    View in AR
                  </Link>
                  <button className="btn btn-solid" type="button" onClick={() => saveHome(home._id)}>
                    Save Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="detail-card top-gap">
        <h3>Latest Website Updates</h3>
        <div className="status-list top-gap">
          {updates.map((update) => (
            <div className="status-item" key={update._id}>
              <p>
                <strong>{update.title}</strong> <span className="muted-text">({update.category})</span>
              </p>
              <p className="muted-text">{update.message}</p>
              <p className="muted-text">
                Posted by {update.createdBy?.name || "Admin"} on {new Date(update.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
          {!updates.length ? <p className="muted-text">No updates posted yet.</p> : null}
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
