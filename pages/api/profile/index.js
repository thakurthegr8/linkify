import withSessionApi from "@/src/middlewares/withSessionApi";
import db from "@/src/services/db";
import Profile from "@/src/services/db/models/Profile";

const GET = withSessionApi(
  db(async (req, res) => {
    console.log(req.user);
    try {
      const data = await Profile.findOne({ profile_for: req.user });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(200).json(error);
    }
  })
);

const POST = withSessionApi(
  db(async (req, res) => {
    const payload = {
      ...req.body,
      profile_for: req.user,
    };
    try {
      const data = await Profile.create(payload);
      return res.status(201).json(data);
    } catch (error) {
      if (Object.keys(error).includes("code") && error.code === 11000) {
        return res.status(400).json("username already exists");
      }
      if (
        Object.keys(error).includes("errors") &&
        Object.keys(error.errors).includes("username")
      ) {
        return res.status(400).json(error.errors?.username?.message);
      }
      return res.status(400).json(error);
    }
  })
);

const PUT = withSessionApi(
  db(async (req, res) => {
    const payload = {
      ...req.body,
    };
    try {
      const data = await Profile.findOneAndUpdate(
        { profile_for: req.user },
        payload,
        { new: true }
      );
      return res.status(201).json(data);
    } catch (error) {
      if (Object.keys(error).includes("code") && error.code === 11000) {
        return res.status(400).json("username already exists");
      }
      if (
        Object.keys(error).includes("errors") &&
        Object.keys(error.errors).includes("username")
      ) {
        console.log(error.errors?.username?.message);
        return res.status(400).json(error.errors?.username?.message);
      }
      return res.status(400).json(error);
    }
  })
);

const handler = async (req, res) => {
  if (req.method === "GET") {
    return GET(req, res);
  }
  if (req.method === "POST") {
    return POST(req, res);
  }
  if (req.method === "PUT") {
    return PUT(req, res);
  }
  return res.status(405).json("method not allowed");
};

export default handler;
