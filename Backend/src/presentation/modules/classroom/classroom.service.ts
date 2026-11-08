import { pool } from "../../../config/database";
import { CustomError } from "../../../domain/errors/custom.error";
import {
  Classroom,
  CreateClassroom,
  UpdateClassroom,
} from "../../../domain/interfaces/classroom.interface";

interface DatabaseError {
  code?: string;
}

function isDatabaseError(error: unknown): error is DatabaseError {
  return typeof error === "object" && error !== null && "code" in error;
}

function handleClassroomDatabaseError(error: unknown): never {
  if (isDatabaseError(error) && error.code === "23505") {
    throw CustomError.conflict("Ya existe un aula con ese nombre");
  }
  if (isDatabaseError(error) && error.code === "23514") {
    throw CustomError.badRequest("La capacidad debe ser mayor que 0");
  }
  throw error;
}

export class ClassroomService {
  public async getAllClassrooms(): Promise<Classroom[]> {
    const sql = `SELECT * FROM classrooms ORDER BY id;`;
    const classrooms = await pool.query<Classroom>(sql);
    return classrooms.rows;
  }

  public async getClassroomById(id: number): Promise<Classroom | null> {
    const sql = `SELECT * FROM classrooms WHERE id = $1;`;
    const classroom = (await pool.query<Classroom>(sql, [id])).rows[0];
    return classroom ?? null;
  }

  public async createClassroom(classroom: CreateClassroom): Promise<Classroom> {
    const sql = `
      INSERT INTO classrooms (name, building, capacity, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    try {
      const createdClassroom = (
        await pool.query<Classroom>(sql, [
          classroom.name,
          classroom.building,
          classroom.capacity,
          classroom.status,
        ])
      ).rows[0];
      if (!createdClassroom) {
        throw CustomError.internalServer("No se pudo crear el aula");
      }
      return createdClassroom;
    } catch (error) {
      handleClassroomDatabaseError(error);
    }
  }

  public async updateClassroom(
    id: number,
    classroom: UpdateClassroom,
  ): Promise<Classroom> {
    const sql = `
      UPDATE classrooms
      SET name = $1, building = $2, capacity = $3, status = $4
      WHERE id = $5
      RETURNING *;
    `;
    try {
      const updatedClassroom = (
        await pool.query<Classroom>(sql, [
          classroom.name,
          classroom.building,
          classroom.capacity,
          classroom.status,
          id,
        ])
      ).rows[0];
      if (!updatedClassroom) {
        throw CustomError.notFound("No existe un aula con ese id");
      }
      return updatedClassroom;
    } catch (error) {
      handleClassroomDatabaseError(error);
    }
  }

  public async deleteClassroom(id: number): Promise<boolean> {
    const sql = `DELETE FROM classrooms WHERE id = $1 RETURNING id;`;
    const deletedClassroom = await pool.query(sql, [id]);
    if (deletedClassroom.rowCount === 0) {
      throw CustomError.notFound("No existe un aula con ese id");
    }
    return true;
  }
}
