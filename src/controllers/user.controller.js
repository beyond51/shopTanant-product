const UserService = require("../services/user.service");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const AsyncHandler = require("../utils/asyncHandler");

const userService = new UserService();

class userController {
  create = AsyncHandler(async (req, res) => {
    let tenantId = req.tenant.id;

    let { User, token } = await userService.createUser(req.body, tenantId);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).json(new ApiResponse("User registered", User));
  });

  login = AsyncHandler(async (req, res) => {
    let { sellerEmail, tenantId, password } = req.body;
     console.log("LOGIN BODY:", req.body);

    let { User, token } = await userService.loginUserByEmail(
      sellerEmail,
      tenantId,
      password,
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSit: "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json(new ApiResponse("login sucessfully", User));
  });

  update = AsyncHandler(async (req, res) => {
    // let tenantId = req.user;
    let { tenantId, sellerEmail, sellerName } = req.body;

    let updated = await userService.updateUser(
      tenantId,
      sellerEmail,
      sellerName,
    );

    res.status(200).json(new ApiResponse("updated", updated));
  });
}
module.exports = userController;
