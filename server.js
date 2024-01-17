import express from "express";
import { connectToMongoDB } from "./connect.js";
import cors from "cors";
import { PORT } from "./utils/envs.js";
import {
  authenticateUser,
  checkUserAlreadExists,
  checkUserCredentials,
} from "./middleware/userMiddleware.js";
import { signUp } from "./controller/signup.js";
import { login } from "./controller/login.js";
import { googleSignIn } from "./controller/googleSignIn.js";
import { initializeFirebase } from "./firebase.config.js";
import multer from "multer";
import { uploadFile } from "./middleware/uploadFile.js";

import { getStorage } from "firebase/storage";
import { uploadTech, uploadUserImages } from "./controller/upload.js";
import { updateExperience } from "./controller/updateExperience.js";
import { updateProjects } from "./controller/updateProjects.js";
import { sendMatchingTechs } from "./controller/sendMatchingTechs.js";
import { updateBasicInfo } from "./controller/UpdateBasicInfo.js";
import { getUser } from "./controller/getUserData.js";
import { updateVisits } from "./controller/updateVisits.js";
import { visitorsRoute } from "./routes/visitors.js";
import { messageRoute } from "./routes/message.js";
import { userRouter } from "./routes/user.js";
import { techRoute } from "./routes/techs.js";

const server = express();
const corsOptions = {
  origin: "https://portfolio-amarjit.netlify.app",
};
server.use(cors());
server.use(express.json());

const firebaseApp = initializeFirebase();
const storage = getStorage(firebaseApp);

const upload = multer({ storage: multer.memoryStorage() });

server.post("/signup", checkUserAlreadExists, signUp);
server.post("/login", checkUserCredentials, login);
server.post("/google", googleSignIn);

server.post(
  "/upload",
  upload.single("file"),
  (req, res, next) => {
    uploadFile(req, res, next, storage);
  },
  uploadTech
);

server.post(
  "/userFile",
  authenticateUser,
  upload.single("file"),
  (req, res, next) => {
    uploadFile(req, res, next, storage);
  },
  uploadUserImages
);

server.post("/experience", authenticateUser, updateExperience);
server.post("/projects", authenticateUser, updateProjects);
server.get("/tech", authenticateUser, sendMatchingTechs);
server.put("/basicinfo", authenticateUser, updateBasicInfo);
server.get("/:email", getUser);
server.put("/visit/:email", updateVisits);
server.use("/visitor", visitorsRoute);
server.use(messageRoute);
server.use("/user", userRouter);
server.use("/techs", techRoute);
connectToMongoDB()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

server.listen(PORT, () => console.log("Server listening at Port", PORT));
