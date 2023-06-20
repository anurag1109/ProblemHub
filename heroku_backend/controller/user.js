const common = require("../common");
const util = require("../util");
const { OAuth2Client } = require("google-auth-library");
const res = require("express/lib/response");
const { cloudeUpload } = require("../helper/uploadFile");
const client = new OAuth2Client(process.env.CLIENT_ID);

module.exports.login = async (req, res) => {
  try {
    const user = await util.model.Users.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    });
    if (user) {
      if (user.status === "Active") {
        if (
          common.checkPassword(
            req.body.password,
            user.password.hashedPassword,
            user.password.salt
          )
        ) {
          res.status(200).send({
            expire_refresh: 1800,
            expire_access: 2400,
            access_token: common.access_token_generator({
              _id: user._id,
              username: user.username,
              email: user.email,
              role: user.role,
            }),
            refresh_token: common.refresh_token_generator({
              _id: user._id,
              username: user.username,
              email: user.email,
              role: user.role,
            }),
          });
        } else {
          res.status(400).send({ message: "username or password is invalid" });
        }
      } else {
        res.status(400).send({ message: "username is not exist" });
      }
    } else {
      res.status(400).send({ message: "username is not exist" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
module.exports.refresh = (req, res) => {
  try {
    const user = req.user;
    res.status(200).send({
      expire_refresh: 1800,
      expire_access: 240,
      access_token: common.access_token_generator({
        username: user.username,
        _id: user._id,
        email: user.email,
      }),
      refresh_token: common.refresh_token_generator({
        username: user.username,
        _id: user._id,
        email: user.email,
      }),
    });
  } catch (err) {
    res.status(400).send({ message: "Unauthorize access" });
  }
};
module.exports.register = async (req, res) => {
  let userData = { ...req.body };
  try {
    const user = await util.model.Users.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (!user) {
      const msgData = await common.sendEmail(
        req.body.email,
        common.generateVarificatioCode()
      );
      let salt = common.salt();
      let hashedPassword = common.encryptPassword(req.body.password, salt);
      userData.password = {
        salt: salt,
        hashedPassword: hashedPassword,
        varificationCode: msgData.varificationCode,
      };
      const result = await util.model.Users.create(userData);
      res.status(200).send({
        access_token: common.access_token_generator({
          username: result.username,
          email: result.email,
          _id: result._id,
          forget: false,
        }),
        email: result.email,
      });
    } else {
      if (user.username === req.body.username) {
        res.status(400).send({ message: "username already exist." });
      } else {
        res.status(400).send({ message: "email already exist." });
      }
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
module.exports.verifyEmail = async (req, res) => {
  try {
    const user = req.user;
    const userData = await util.model.Users.findOne({ _id: user._id });
    if (user && user.forget) {
      if (
        userData &&
        userData.password.varificationCode == req.body.varificationCode
      ) {
        res.status(200).send({
          access_token: common.access_token_generator({
            _id: userData._id,
            username: userData.username,
            email: userData.email,
          }),
          forget: true,
        });
      } else {
        res.status(400).send({ message: "varificationCode is wrong1" });
      }
    } else {
      if (
        userData &&
        userData.password.varificationCode == req.body.varificationCode
      ) {
        await util.model.Users.findByIdAndUpdate(user._id, {
          status: "Active",
        });
        res.status(200).send({ message: "Successfully updated" });
      } else {
        res.status(400).send({ message: "varificationCode is wrong" });
      }
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
module.exports.forgetPassword = async (req, res) => {
  try {
    const findedUser = await util.model.Users.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    });
    if (findedUser && findedUser.status === "Active") {
      const varificationCode = common.generateVarificatioCode();
      const sendedEmail = await common.sendEmail(
        findedUser.email,
        varificationCode
      );
      let password = {
        ...findedUser.password,
        varificationCode: sendedEmail.varificationCode,
      };
      const updatedUser = await util.model.Users.findOneAndUpdate(
        { _id: findedUser._id },
        { password: password },
        { new: true }
      );
      res.send({
        access_token: common.access_token_generator({
          _id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          forget: true,
        }),
        email: updatedUser.email,
      });
    } else {
      res.status(400).send({ message: "user doesn't exist." });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    const { _id, forget } = req.user;
    if (forget) {
      let salt = common.salt();
      let hashedPassword = common.encryptPassword(req.body.password, salt);
      const data = await util.model.Users.findByIdAndUpdate(
        { _id },
        { password: { salt: salt, hashedPassword: hashedPassword } },
        { new: true }
      );
      res.status(200).send({ message: "Password successfully changed" });
    } else {
      res.status(401).send({ message: "Unauthorized access" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports.userContext = async (req, res) => {
  try {
    const { _id } = req.user;
    let { username, firstName, lastName, email, dateOfBirth, role, picture } =
      await util.model.Users.findOne({ _id });
    res
      .status(200)
      .send({
        username,
        firstName,
        lastName,
        email,
        dateOfBirth,
        role,
        _id,
        picture,
      });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports.loginWithGoogle = async (req, res) => {
  try {
    const { idToken } = req.body;
    const response = await client.verifyIdToken({
      idToken,
      audience: process.env.CLIENT_ID,
    });
    const { email_verified, given_name, family_name, picture, email } =
      response.payload;
    if (email_verified) {
      const user = await util.model.Users.findOne({ email: email });
      if (user) {
        if (user.status === "Active") {
          res.status(200).send({
            expire_refresh: 1800,
            expire_access: 2400,
            access_token: common.access_token_generator({
              _id: user._id,
              username: user.username,
              email: user.email,
              role: user.role,
            }),
            refresh_token: common.refresh_token_generator({
              _id: user._id,
              username: user.username,
              email: user.email,
              role: user.role,
            }),
          });
        }
      } else {
        const crestedUser = await util.model.Users.create({
          firstName: given_name,
          lastName: family_name,
          email: email,
          username: email,
          picture,
          password: {
            salt: "ani123",
            hashedPassword: "12geh3637#hdt",
          },
          status: "Active",
        });
        res.status(200).send({
          expire_refresh: 1800,
          expire_access: 2400,
          access_token: common.access_token_generator({
            _id: crestedUser._id,
            username: crestedUser.username,
            email: crestedUser.email,
            role: crestedUser.role,
          }),
          refresh_token: common.refresh_token_generator({
            _id: crestedUser._id,
            username: crestedUser.username,
            email: crestedUser.email,
            role: crestedUser.role,
          }),
        });
      }
    } else {
      res
        .status(400)
        .send({ message: "This Email is not verified by google." });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports.getUserList = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    query = {
      $or: [
        { username: { $regex: search, $options: "i" } },
        { firstName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };
    const data = await util.model.Users.find(query, {
      password: 0,
      dateOfBirth: 0,
      role: 0,
      status: 0,
      __v: 0,
      picture: 0,
      createdAt:0,
      updatedAt:0
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports.test = async (req, res) => {
  try {
    let result = await cloudeUpload(req);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};
