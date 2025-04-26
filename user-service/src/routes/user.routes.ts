import { Request, Response, Router } from "express";
import { UserController } from "../controllers/user.controller";
import { container } from "../config/inversify";

const router: Router = Router();

const userController = container.get<UserController>("UserController");

router.post("/signup", (req: Request, res: Response) => {
    userController.signup(req, res);
})

router.post("/login", (req: Request, res: Response) => {
    userController.login(req, res)
})

router.get("/:id",  (req: Request, res: Response) => {
    userController.getUser(req, res);
})

router.post("/logout", (req: Request, res: Response) => {
    userController.logout(req, res);
});

router.post("/update", (req: Request, res: Response) => {
  userController.updateUser(req, res);
});

export default router;