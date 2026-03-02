import fs from "fs";

import HttpError from "../middleware/HttpError.js";
import Profile from "../model/ProfileModel.js";

const createProfile = async (req, res, next) => {
  try {
    const { fullName, bio, headline } = req.body;

    const profileImage = req.files.profileImage?.[0];
    const resume = req.files.resume?.[0];
    const introVideo = req.files.introVideo?.[0];
    const projectImages = req.files.projectImages || [];

    const newProfile = new Profile({
      fullName,
      bio,
      headline,
      profileImage: profileImage?.path || null,
      resume: resume?.path || null,
      introVideo: introVideo?.path || null,
      projectImages: projectImages.map((file) => file.path) || null,
    });

    await newProfile.save();

    res.status(201).json({ success: true, newProfile });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getAllProfile = async (req, res, next) => {
  try {
    const profiles = await Profile.find({});

    if (profiles.length === 0) {
      res.status(200).json({ message: "no data available" });
    }

    res.status(200).json({ success: true, profiles });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const profileById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const profile = await Profile.findById(id);

    if (!profile) {
      return next(new HttpError("profile not found", 404));
    }

    res.status(200).json({ success: true, profile });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// delete

const deleteProfile = async (req, res, next) => {
  try {
    const id = req.params.id;

    const profile = await Profile.findById(id);

    if (!profile) {
      return next(new HttpError("profile not found", 404));
    }

    if (profile.profileImage) {
      fs.unlinkSync(profile.profileImage);
    }

    if (profile.resume) {
      fs.unlinkSync(profile.resume);
    }

    if (profile.introVideo) {
      fs.unlinkSync(profile.introVideo);
    }

    if (profile.projectImages) {
      profile.projectImages.map((file) => {
        return fs.unlinkSync(file);
      });
    }

    await profile.deleteOne();

    res.status(200).json({
      success: true,
      message: "profile and profile related data deleted successfully ",
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};



export default { createProfile, getAllProfile, profileById, deleteProfile };