import express from "express";

import upload from "../middleware/upload.js";
import profileController from "../controller/ProfileController.js";

const router = express.Router();

router.post(
  "/add",
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },
    {
      name: "resume",
      maxCount: 1,
    },
    {
      name: "projectImages",
      maxCount: 3,
    },
    {
      name: "introVideo",
      maxCount: 1,
    },
  ]),
  profileController.createProfile,
);

// get all profile

router.get("/allProfiles", profileController.getAllProfile);

// get specific profile by id

router.get("/:id", profileController.profileById);

// deleting specific data

router.delete("/:id", profileController.deleteProfile);

export default router;