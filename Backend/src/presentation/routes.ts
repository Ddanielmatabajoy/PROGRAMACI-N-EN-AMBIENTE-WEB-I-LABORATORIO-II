import { Router } from "express";
import { CourseRoutes } from "./modules/course/course.route";
import { StudentRoutes } from "./modules/student/student.routes";
import { TeacherRoutes } from "./modules/teacher/teacher.routes";

export class AppRoutes {

  static get routes(): Router {
    const router = Router();
    const apiRouter = Router();

    // Definir rutas
    apiRouter.use("/students", StudentRoutes.routes);
    apiRouter.use("/courses", CourseRoutes.routes);
    apiRouter.use("/teachers", TeacherRoutes.routes);

    router.use("/api", apiRouter);

    return router;
  }
}