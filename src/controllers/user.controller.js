const UserService = require("../services/user.service");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const AsyncHandler = require("../utils/asyncHandler");

const userService = new UserService();

class userController {
  me = AsyncHandler(async (req, res) => {
    let user = req.user;
    let tenant = req.tenant;
    res.status(200).json(new ApiResponse("user fetched", { user, tenant }));
  });
  create = AsyncHandler(async (req, res) => {
    let tenantId = req.tenantId;

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
    let { sellerEmail, password } = req.body;

    let { User } = await userService.loginUserByEmail(sellerEmail, password);

    res.status(200).json(new ApiResponse("login sucessfully", User));
  });

  logout = AsyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.status(200).json(new ApiResponse("logout succesfully"));
  });

  update = AsyncHandler(async (req, res) => {
    let userId = req.user.id;
    let { sellerEmail, sellerName } = req.body;

    let updated = await userService.updateUser(userId, sellerEmail, sellerName);

    res.status(200).json(new ApiResponse("updated", updated));
  });
}
module.exports = userController;
