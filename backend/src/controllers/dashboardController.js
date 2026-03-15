import CompletedHome from "../models/CompletedHome.js";
import InteriorDesign from "../models/InteriorDesign.js";
import InteriorEnquiry from "../models/InteriorEnquiry.js";
import ContactMessage from "../models/ContactMessage.js";
import SiteUpdate from "../models/SiteUpdate.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  const [projectCount, interiorDesignCount, enquiryCount, contactCount, updateCount, userCount] = await Promise.all([
    CompletedHome.countDocuments(),
    InteriorDesign.countDocuments(),
    InteriorEnquiry.countDocuments(),
    ContactMessage.countDocuments(),
    SiteUpdate.countDocuments(),
    User.countDocuments(),
  ]);

  return res.json({
    metrics: {
      userCount,
      projectCount,
      interiorDesignCount,
      enquiryCount,
      contactCount,
      updateCount,
    },
  });
};
