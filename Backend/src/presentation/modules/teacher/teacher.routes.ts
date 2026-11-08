import { Router } from "express";
import { TeacherController } from "./teacher.controller";

export class TeacherRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new TeacherController();

    router.get("/", controller.getAllTeachers);
    router.get("/:id", controller.getTeacherById);
    router.post("/", controller.createTeacher);
    router.put("/:id", controller.updateTeacher);
    router.delete("/:id", controller.deleteTeacher);

    return router;
  }
}
