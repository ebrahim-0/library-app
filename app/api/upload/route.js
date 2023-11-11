// pages/api/upload.js
import multer from "multer";
import { google } from "googleapis";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default upload.single("file")(async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "path-to-your-service-account-key.json",
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });

    const drive = google.drive({ version: "v3", auth });

    const file = req.file;

    const driveResponse = await drive.files.create({
      requestBody: {
        name: file.originalname,
        mimeType: "application/pdf",
      },
      media: {
        mimeType: "application/pdf",
        body: file.buffer,
      },
    });

    const driveLink = `https://drive.google.com/file/d/${driveResponse.data.id}/view`;

    res.status(200).json({ success: true, driveLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
