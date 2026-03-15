import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
  const { category, featured, search } = req.query;
  const query = {};

  if (category) query.category = category;
  if (featured === "true") query.featured = true;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ];
  }

  const projects = await Project.find(query).sort({ completionDate: -1 });
  return res.json(projects);
};

export const getProjectBySlug = async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug });
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  return res.json(project);
};

export const createProject = async (req, res) => {
  const project = await Project.create(req.body);
  return res.status(201).json(project);
};

export const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  Object.assign(project, req.body);
  const updated = await project.save();
  return res.json(updated);
};

export const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  await project.deleteOne();
  return res.json({ message: "Project deleted" });
};
