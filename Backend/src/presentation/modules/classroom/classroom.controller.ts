import { Request, Response } from "express";
import { CreateClassroomDTO } from "../../../domain/dtos/create-classroom.dto";
import { UpdateClassroomDTO } from "../../../domain/dtos/update-classroom.dto";
import { HandleError } from "../../../domain/errors/handle.error";
import { ClassroomService } from "./classroom.service";

export class ClassroomController {
  private readonly classroomService = new ClassroomService();

  getAllClassrooms = (_req: Request, res: Response): void => {
    this.classroomService.getAllClassrooms()
      .then((classrooms) => res.status(200).json(classrooms))
      .catch((error) => HandleError.error(error, res));
  };

  getClassroomById = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    this.classroomService.getClassroomById(id)
      .then((classroom) => {
        if (!classroom) {
          res.status(404).json({ error: "No existe un aula con ese id" });
          return;
        }
        res.status(200).json(classroom);
      })
      .catch((error) => HandleError.error(error, res));
  };

  createClassroom = (req: Request, res: Response): void => {
    const [error, createClassroomDTO] = CreateClassroomDTO.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.classroomService.createClassroom(createClassroomDTO!)
      .then((classroom) => res.status(201).json(classroom))
      .catch((error) => HandleError.error(error, res));
  };

  updateClassroom = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const [error, updateClassroomDTO] = UpdateClassroomDTO.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.classroomService.updateClassroom(id, updateClassroomDTO!)
      .then((classroom) => res.status(200).json(classroom))
      .catch((err) => HandleError.error(err, res));
  };

  deleteClassroom = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    this.classroomService.deleteClassroom(id)
      .then((result) => res.status(200).json({ result }))
      .catch((error) => HandleError.error(error, res));
  };
}
