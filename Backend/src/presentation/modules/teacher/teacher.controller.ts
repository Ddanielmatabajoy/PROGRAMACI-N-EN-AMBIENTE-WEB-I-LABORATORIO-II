import { Request, Response } from "express";
import { HandleError } from "../../../domain/errors/handle.error";
import { CreateTeacherDTO } from "../../../domain/dtos/create-teacher.dto";
import { UpdateTeacherDTO } from "../../../domain/dtos/update-teacher.dto";
import { TeacherService } from "./teacher.service";

export class TeacherController {
  private readonly teacherService = new TeacherService();

  getAllTeachers = (_req: Request, res: Response): void => {
    this.teacherService.getAllTeachers()
      .then((teachers) => res.status(200).json(teachers))
      .catch((error) => HandleError.error(error, res));
  };

  getTeacherById = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    this.teacherService.getTeacherById(id)
      .then((teacher) => {
        if (!teacher) {
          res.status(404).json({ error: "No existe un docente con ese id" });
          return;
        }
        res.status(200).json(teacher);
      })
      .catch((error) => HandleError.error(error, res));
  };

  createTeacher = (req: Request, res: Response): void => {
    const [error, createTeacherDTO] = CreateTeacherDTO.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.teacherService.createTeacher(createTeacherDTO!)
      .then((teacher) => res.status(201).json(teacher))
      .catch((error) => HandleError.error(error, res));
  };

  updateTeacher = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const [error, updateTeacherDTO] = UpdateTeacherDTO.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.teacherService.updateTeacher(id, updateTeacherDTO!)
      .then((teacher) => res.status(200).json(teacher))
      .catch((err) => HandleError.error(err, res));
  };

  deleteTeacher = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    this.teacherService.deleteTeacher(id)
      .then((result) => res.status(200).json({ result }))
      .catch((error) => HandleError.error(error, res));
  };
}
