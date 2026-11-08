import { Router } from "express";
import { ClassroomController } from "./classroom.controller";

export class ClassroomRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ClassroomController();

    router.get("/", controller.getAllClassrooms);
    router.get("/:id", controller.getClassroomById);
    router.post("/", controller.createClassroom);
    router.put("/:id", controller.updateClassroom);
    router.delete("/:id", controller.deleteClassroom);

    return router;
  }
}
