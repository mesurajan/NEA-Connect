const Connection = require('../models/Connection');

// Get all connections
exports.getConnections = async (req, res) => {
  try {
    console.log('📩 Received form data:', req.body);  // Log form data
    console.log('🧾 Received files:', req.files);      // Log uploaded files

    // Fetch all connections from the database
    const connections = await Connection.find();
    res.json(connections);  // Send connections data as JSON response
  } catch (err) {
    console.error("❌ Error fetching connections:", err);
    res.status(500).json({ message: err.message });
  }
};

// Add a new connection with file upload
exports.addConnection = async (req, res) => {
  try {
    const {
      fullName,
      citizenshipNo,
      phone,
      email,
      propertyAddress,
      district,
      municipality,
      wardNo,
      connectionType,
      loadDemand,
      additionalInfo,
    } = req.body;

    const files = req.files;  // Get uploaded files from the request

    // Check if the required files are uploaded
    if (!files || !files.citizenship || !files.landCertificate || !files.constructionPermit || !files.sitePlan) {
      return res.status(400).json({ message: 'All required files must be uploaded' });
    }

    // Create a new connection document
    const newConnection = new Connection({
      fullName,
      citizenshipNo,
      phone,
      email,
      propertyAddress,
      district,
      municipality,
      wardNo,
      connectionType,
      loadDemand,
      additionalInfo,
      documents: {
        citizenship: files?.citizenship?.[0]?.path || '',  // Save file path
        landCertificate: files?.landCertificate?.[0]?.path || '',
        constructionPermit: files?.constructionPermit?.[0]?.path || '',
        sitePlan: files?.sitePlan?.[0]?.path || '',
      },
    });

    // Save the new connection to the database
    await newConnection.save();

    // Respond with the newly created connection data
    res.status(201).json(newConnection);
  } catch (err) {
    console.error("❌ Error adding connection:", err);
    res.status(400).json({ message: err.message });
  }
};
