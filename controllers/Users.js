import Users from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email", "createdAt", "updatedAt", "status", "role"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (!name || !email || !password) return res.status(400).json({ msg: "Name, email, and password are required", field: !name ? "name" : !email ? "email" : "password" });
  if (password !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password do not match" });
  const existingUserWithSameName = await Users.findOne({ where: { name: name } });
  if (existingUserWithSameName) return res.status(400).json({ msg: "User with the same name already exists" });
  const existingUserWithSameEmail = await Users.findOne({ where: { email: email } });
  if (existingUserWithSameEmail) return res.status(400).json({ msg: "User with the same email already exists" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.json({ msg: "Registration Successful" });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    console.log(user[0].status);
    if (user[0].status === false) {
      return res.status(400).json({ msg: "User is blocked" });
    }
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const role = user[0].role;
    const accessToken = jwt.sign({ userId, name, email, role }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15s",
    });
    const refreshToken = jwt.sign({ userId, name, email, role }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "User not found" });
  }
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

export const updateStatusAndRole = async (req, res) => {
  const { id } = req.params;
  const { status, role } = req.body;
  Users.update({ status, role }, { where: { id } })
    .then(() => {
      res.send({ success: true });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ success: false, message: "Error updating user" });
    });
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  if (!userId) return res.sendStatus(204);
  const user = await Users.findByPk(userId);
  if (!user) return res.sendStatus(204);
  await user.destroy();
  return res.sendStatus(200);
};
