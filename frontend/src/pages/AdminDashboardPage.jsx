import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/client";
import MetricCard from "../components/MetricCard";
import { useAuth } from "../context/AuthContext";

const initialHomeForm = {
  title: "",
  slug: "",
  description: "",
  location: "",
  houseType: "Villa",
  constructionArea: 1500,
  yearCompleted: new Date().getFullYear(),
  images: "",
  model3D: "",
  featured: false,
};

const initialInteriorForm = {
  title: "",
  description: "",
  roomType: "Living Room",
  designStyle: "",
  images: "",
};

const initialUpdateForm = {
  title: "",
  message: "",
  category: "General",
};

const enquiryStatuses = ["Pending", "Contacted", "Closed"];

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [homes, setHomes] = useState([]);
  const [interiors, setInteriors] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [siteUpdates, setSiteUpdates] = useState([]);
  const [homeForm, setHomeForm] = useState(initialHomeForm);
  const [interiorForm, setInteriorForm] = useState(initialInteriorForm);
  const [updateForm, setUpdateForm] = useState(initialUpdateForm);
  const [editingHomeId, setEditingHomeId] = useState("");
  const [editingInteriorId, setEditingInteriorId] = useState("");
  const [note, setNote] = useState("");

  const isAdmin = user?.role === "admin";

  const sortedEnquiries = useMemo(
    () => [...enquiries].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [enquiries]
  );

  const loadAdminData = async () => {
    const [statsRes, homesRes, interiorsRes, enquiriesRes, contactsRes, updatesRes] = await Promise.all([
      api.get("/dashboard/stats"),
      api.get("/homes"),
      api.get("/interiors"),
      api.get("/interior-enquiry"),
      api.get("/contact"),
      api.get("/site-updates"),
    ]);

    setStats(statsRes.data);
    setHomes(homesRes.data);
    setInteriors(interiorsRes.data);
    setEnquiries(enquiriesRes.data);
    setContacts(contactsRes.data);
    setSiteUpdates(updatesRes.data);
  };

  useEffect(() => {
    if (!isAdmin) return;

    loadAdminData().catch(() => {
      setNote("Some admin modules could not be loaded.");
    });
  }, [isAdmin]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <section className="container section-space">
        <h2>Admin Dashboard</h2>
        <p className="muted-text">Only admin users can access this page.</p>
      </section>
    );
  }

  const toArray = (value) =>
    value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

  const resetHomeForm = () => {
    setHomeForm(initialHomeForm);
    setEditingHomeId("");
  };

  const resetInteriorForm = () => {
    setInteriorForm(initialInteriorForm);
    setEditingInteriorId("");
  };

  const submitHome = async (e) => {
    e.preventDefault();
    setNote("");

    const payload = {
      ...homeForm,
      constructionArea: Number(homeForm.constructionArea),
      yearCompleted: Number(homeForm.yearCompleted),
      images: toArray(homeForm.images),
    };

    try {
      if (editingHomeId) {
        await api.put(`/homes/${editingHomeId}`, payload);
        setNote("Completed home updated.");
      } else {
        await api.post("/homes", payload);
        setNote("Completed home added.");
      }
      resetHomeForm();
      await loadAdminData();
    } catch (error) {
      setNote(error?.response?.data?.message || "Unable to save completed home.");
    }
  };

  const submitInterior = async (e) => {
    e.preventDefault();
    setNote("");

    const payload = {
      ...interiorForm,
      images: toArray(interiorForm.images),
    };

    try {
      if (editingInteriorId) {
        await api.put(`/interiors/${editingInteriorId}`, payload);
        setNote("Interior design updated.");
      } else {
        await api.post("/interiors", payload);
        setNote("Interior design added.");
      }
      resetInteriorForm();
      await loadAdminData();
    } catch (error) {
      setNote(error?.response?.data?.message || "Unable to save interior design.");
    }
  };

  const editHome = (home) => {
    setEditingHomeId(home._id);
    setHomeForm({
      title: home.title,
      slug: home.slug,
      description: home.description,
      location: home.location,
      houseType: home.houseType,
      constructionArea: home.constructionArea,
      yearCompleted: home.yearCompleted,
      images: (home.images || []).join("\n"),
      model3D: home.model3D || "",
      featured: Boolean(home.featured),
    });
  };

  const editInterior = (interior) => {
    setEditingInteriorId(interior._id);
    setInteriorForm({
      title: interior.title,
      description: interior.description,
      roomType: interior.roomType,
      designStyle: interior.designStyle,
      images: (interior.images || []).join("\n"),
    });
  };

  const deleteHome = async (id) => {
    try {
      await api.delete(`/homes/${id}`);
      setNote("Completed home deleted.");
      await loadAdminData();
    } catch (error) {
      setNote(error?.response?.data?.message || "Unable to delete completed home.");
    }
  };

  const deleteInterior = async (id) => {
    try {
      await api.delete(`/interiors/${id}`);
      setNote("Interior design deleted.");
      await loadAdminData();
    } catch (error) {
      setNote(error?.response?.data?.message || "Unable to delete interior design.");
    }
  };

  const updateEnquiryStatus = async (id, status) => {
    try {
      await api.put(`/interior-enquiry/${id}/status`, { status });
      await loadAdminData();
    } catch (error) {
      setNote(error?.response?.data?.message || "Unable to update enquiry status.");
    }
  };

  const publishUpdate = async (e) => {
    e.preventDefault();
    setNote("");

    try {
      await api.post("/site-updates", updateForm);
      setUpdateForm(initialUpdateForm);
      setNote("Website update published.");
      await loadAdminData();
    } catch (error) {
      setNote(error?.response?.data?.message || "Unable to publish update.");
    }
  };

  const deleteUpdate = async (id) => {
    try {
      await api.delete(`/site-updates/${id}`);
      setNote("Website update deleted.");
      await loadAdminData();
    } catch (error) {
      setNote(error?.response?.data?.message || "Unable to delete update.");
    }
  };

  return (
    <section className="container section-space page-stack">
      <p className="eyebrow">Admin Dashboard</p>
      <h2>Platform Content Management</h2>
      <p className="muted-text">
        Manage completed homes, interior designs, enquiries, contact messages, and analytics.
      </p>

      {note ? <p className="muted-text">{note}</p> : null}

      {stats ? (
        <div className="metrics-grid top-gap">
          <MetricCard label="Total Users" value={stats.metrics.userCount} />
          <MetricCard label="Total Projects" value={stats.metrics.projectCount} />
          <MetricCard label="Total Enquiries" value={stats.metrics.enquiryCount} />
          <MetricCard label="Website Updates" value={stats.metrics.updateCount} />
        </div>
      ) : null}

      <div className="dashboard-grid top-gap">
        <form className="detail-card" onSubmit={publishUpdate}>
          <h3>Publish Website Update</h3>
          <input
            className="input"
            placeholder="Update title"
            required
            value={updateForm.title}
            onChange={(e) => setUpdateForm({ ...updateForm, title: e.target.value })}
          />
          <select
            className="input"
            value={updateForm.category}
            onChange={(e) => setUpdateForm({ ...updateForm, category: e.target.value })}
          >
            <option>General</option>
            <option>Completed Homes</option>
            <option>Interior Design</option>
            <option>AR Feature</option>
            <option>Dashboard</option>
          </select>
          <textarea
            className="input"
            rows={4}
            placeholder="Write update message for customers"
            required
            value={updateForm.message}
            onChange={(e) => setUpdateForm({ ...updateForm, message: e.target.value })}
          />
          <button className="btn btn-solid" type="submit">
            Publish Update
          </button>
        </form>

        <div className="detail-card">
          <h3>Published Updates</h3>
          <div className="status-list top-gap admin-list-scroll">
            {siteUpdates.map((update) => (
              <div className="status-item" key={update._id}>
                <p><strong>{update.title}</strong> | {update.category}</p>
                <p className="muted-text">{update.message}</p>
                <p className="muted-text">{new Date(update.createdAt).toLocaleString()}</p>
                <div className="card-actions">
                  <button className="btn btn-solid" type="button" onClick={() => deleteUpdate(update._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {!siteUpdates.length ? <p className="muted-text">No website updates yet.</p> : null}
          </div>
        </div>
      </div>

      <div className="dashboard-grid top-gap">
        <form className="detail-card" onSubmit={submitHome}>
          <h3>{editingHomeId ? "Edit Completed Home" : "Add Completed Home"}</h3>
          <input
            className="input"
            placeholder="Project name"
            required
            value={homeForm.title}
            onChange={(e) => setHomeForm({ ...homeForm, title: e.target.value })}
          />
          <input
            className="input"
            placeholder="Slug"
            required
            value={homeForm.slug}
            onChange={(e) => setHomeForm({ ...homeForm, slug: e.target.value })}
          />
          <input
            className="input"
            placeholder="Location"
            required
            value={homeForm.location}
            onChange={(e) => setHomeForm({ ...homeForm, location: e.target.value })}
          />
          <div className="form-grid-two">
            <select
              className="input"
              value={homeForm.houseType}
              onChange={(e) => setHomeForm({ ...homeForm, houseType: e.target.value })}
            >
              <option>Villa</option>
              <option>Duplex</option>
              <option>Independent House</option>
              <option>Apartment</option>
            </select>
            <input
              className="input"
              type="number"
              min="100"
              placeholder="Construction area"
              value={homeForm.constructionArea}
              onChange={(e) => setHomeForm({ ...homeForm, constructionArea: e.target.value })}
            />
          </div>
          <input
            className="input"
            type="number"
            placeholder="Year completed"
            value={homeForm.yearCompleted}
            onChange={(e) => setHomeForm({ ...homeForm, yearCompleted: e.target.value })}
          />
          <textarea
            className="input"
            rows={3}
            placeholder="Description"
            required
            value={homeForm.description}
            onChange={(e) => setHomeForm({ ...homeForm, description: e.target.value })}
          />
          <textarea
            className="input"
            rows={3}
            placeholder="Image URLs (one per line)"
            value={homeForm.images}
            onChange={(e) => setHomeForm({ ...homeForm, images: e.target.value })}
          />
          <input
            className="input"
            placeholder="3D model URL (.glb/.gltf)"
            value={homeForm.model3D}
            onChange={(e) => setHomeForm({ ...homeForm, model3D: e.target.value })}
          />
          <label className="check-row">
            <input
              type="checkbox"
              checked={homeForm.featured}
              onChange={(e) => setHomeForm({ ...homeForm, featured: e.target.checked })}
            />
            Mark as featured
          </label>
          <div className="card-actions">
            <button className="btn btn-solid" type="submit">
              {editingHomeId ? "Update Home" : "Add Home"}
            </button>
            {editingHomeId ? (
              <button className="btn btn-outline" type="button" onClick={resetHomeForm}>
                Cancel Edit
              </button>
            ) : null}
          </div>
        </form>

        <div className="detail-card">
          <h3>Project Management</h3>
          <div className="status-list top-gap admin-list-scroll">
            {homes.map((home) => (
              <div className="status-item" key={home._id}>
                <p><strong>{home.title}</strong></p>
                <p className="muted-text">{home.location} | {home.yearCompleted}</p>
                <div className="card-actions">
                  <button className="btn btn-outline" type="button" onClick={() => editHome(home)}>
                    Edit
                  </button>
                  <button className="btn btn-solid" type="button" onClick={() => deleteHome(home._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {!homes.length ? <p className="muted-text">No completed homes available.</p> : null}
          </div>
        </div>
      </div>

      <div className="dashboard-grid top-gap">
        <form className="detail-card" onSubmit={submitInterior}>
          <h3>{editingInteriorId ? "Edit Interior Design" : "Add Interior Design"}</h3>
          <input
            className="input"
            placeholder="Title"
            required
            value={interiorForm.title}
            onChange={(e) => setInteriorForm({ ...interiorForm, title: e.target.value })}
          />
          <select
            className="input"
            value={interiorForm.roomType}
            onChange={(e) => setInteriorForm({ ...interiorForm, roomType: e.target.value })}
          >
            <option>Living Room</option>
            <option>Bedroom</option>
            <option>Kitchen</option>
            <option>Dining Area</option>
            <option>Office Room</option>
          </select>
          <input
            className="input"
            placeholder="Design style"
            required
            value={interiorForm.designStyle}
            onChange={(e) => setInteriorForm({ ...interiorForm, designStyle: e.target.value })}
          />
          <textarea
            className="input"
            rows={3}
            placeholder="Description"
            required
            value={interiorForm.description}
            onChange={(e) => setInteriorForm({ ...interiorForm, description: e.target.value })}
          />
          <textarea
            className="input"
            rows={3}
            placeholder="Image URLs (one per line)"
            value={interiorForm.images}
            onChange={(e) => setInteriorForm({ ...interiorForm, images: e.target.value })}
          />
          <div className="card-actions">
            <button className="btn btn-solid" type="submit">
              {editingInteriorId ? "Update Interior" : "Add Interior"}
            </button>
            {editingInteriorId ? (
              <button className="btn btn-outline" type="button" onClick={resetInteriorForm}>
                Cancel Edit
              </button>
            ) : null}
          </div>
        </form>

        <div className="detail-card">
          <h3>Interior Design Management</h3>
          <div className="status-list top-gap admin-list-scroll">
            {interiors.map((interior) => (
              <div className="status-item" key={interior._id}>
                <p><strong>{interior.title}</strong></p>
                <p className="muted-text">{interior.roomType} | {interior.designStyle}</p>
                <div className="card-actions">
                  <button className="btn btn-outline" type="button" onClick={() => editInterior(interior)}>
                    Edit
                  </button>
                  <button className="btn btn-solid" type="button" onClick={() => deleteInterior(interior._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {!interiors.length ? <p className="muted-text">No interior designs available.</p> : null}
          </div>
        </div>
      </div>

      <div className="detail-card top-gap">
        <h3>Interior Enquiry Management</h3>
        <div className="status-list top-gap">
          {sortedEnquiries.map((enquiry) => (
            <div className="status-item" key={enquiry._id}>
              <p><strong>{enquiry.name}</strong> | {enquiry.interiorType}</p>
              <p className="muted-text">{enquiry.email} | {enquiry.phone} | {enquiry.city}</p>
              <p className="muted-text">{enquiry.message}</p>
              <div className="card-actions">
                {enquiryStatuses.map((status) => (
                  <button
                    key={status}
                    type="button"
                    className="btn btn-outline"
                    onClick={() => updateEnquiryStatus(enquiry._id, status)}
                    disabled={enquiry.status === status}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {!sortedEnquiries.length ? <p className="muted-text">No interior enquiries yet.</p> : null}
        </div>
      </div>

      <div className="detail-card top-gap">
        <h3>Contact Messages</h3>
        <div className="status-list top-gap">
          {contacts.map((message) => (
            <div className="status-item" key={message._id}>
              <p><strong>{message.name}</strong> | {message.email}</p>
              <p className="muted-text">{message.phone || "No phone"}</p>
              <p className="muted-text">{message.message}</p>
            </div>
          ))}
          {!contacts.length ? <p className="muted-text">No contact messages yet.</p> : null}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
