import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
export const uploadFile = async (req, res, next, storage) => {
  try {
    console.log(req.file);
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const file = req.file;
    const fileName = req.key
      ? req.key + "/" + Date.now() + "_" + file.originalname
      : Date.now() + "_" + file.originalname;

    await uploadBytes(ref(storage, fileName), file.buffer);

    const fileUrl = await getDownloadURL(ref(storage, fileName));
    req.fileUrl = fileUrl;
    console.log("File uploaded Succesfull!", fileUrl);
    return next();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Server error." });
  }
};
