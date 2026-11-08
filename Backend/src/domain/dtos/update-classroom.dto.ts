import { UpdateClassroom } from "../interfaces/classroom.interface";

export class UpdateClassroomDTO implements UpdateClassroom {
  private constructor(
    public readonly name: string,
    public readonly building: string,
    public readonly capacity: number,
    public readonly status: boolean,
  ) {}

  static create(
    object: Record<string, unknown>,
  ): [string | undefined, UpdateClassroomDTO?] {
    const { name, building, capacity, status } = object;

    if (typeof name !== "string" || !name.trim()) return ["Missing name"];
    if (typeof building !== "string" || !building.trim())
      return ["Missing building"];
    if (typeof capacity !== "number" || !Number.isInteger(capacity) || capacity <= 0)
      return ["capacity must be an integer greater than 0"];
    if (typeof status !== "boolean") return ["Missing or invalid status"];

    if (name.trim().length > 100)
      return ["name is too large, max length is 100 characters"];
    if (building.trim().length > 100)
      return ["building is too large, max length is 100 characters"];

    return [
      undefined,
      new UpdateClassroomDTO(
        name.trim(),
        building.trim(),
        capacity,
        status,
      ),
    ];
  }
}
