import { Request, Response, Router } from "express";
import { UserController } from "../controllers/user.controller";
import { container } from "../config/inversify";

const router: Router = Router();

const userController = container.get<UserController>("UserController");

// User authentication routes
router.post("/signup", (req: Request, res: Response) => {
    userController.signup(req, res);
});

router.post("/login", (req: Request, res: Response) => {
    userController.login(req, res)
});

router.post("/logout", (req: Request, res: Response) => {
    userController.logout(req, res);
});

router.post("/refresh", (req: Request, res: Response) => {
    userController.refreshToken(req, res);
});

// User information routes
router.get("/", (req: Request, res: Response) => {
    userController.getUser(req, res);
});

router.put("/update", (req: Request, res: Response) => {
    userController.updateUser(req, res);
});

router.post("/email", (req: Request, res: Response) => {
    userController.checkEmailExist(req, res);
});

// Profile routes - RESTful nested structure
// Get a specific profile
router.get("/profile", (req: Request, res: Response) => {
    userController.getProfile(req, res);
});

// Get all profiles for a user
router.get("/profiles", (req: Request, res: Response) => {
    userController.getProfilePreview(req, res);
});

// Create a new profile
router.post("/profiles", (req: Request, res: Response) => {
    userController.addProfile(req, res);
});

// Update a profile
// router.put("/profiles/:profileId", (req: Request, res: Response) => {
//     userController.updateProfile(req, res);
// });

// Delete a profile
// router.delete("/profiles/:profileId", (req: Request, res: Response) => {
//     userController.deleteProfile(req, res);
// });

export default router;