import { CreateTeacher } from "../interfaces/teacher.interface";

export class CreateTeacherDTO implements CreateTeacher {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly specialty: string,
    public readonly status: boolean,
  ) {}

  static create(
    object: Record<string, unknown>,
  ): [string | undefined, CreateTeacherDTO?] {
    const { name, email, phone, specialty, status } = object;

    if (typeof name !== "string" || !name.trim()) return ["Missing name"];
    if (typeof email !== "string" || !email.trim()) return ["Missing email"];
    if (typeof phone !== "string" || !phone.trim()) return ["Missing phone"];
    if (typeof specialty !== "string" || !specialty.trim())
      return ["Missing specialty"];
    if (typeof status !== "boolean") return ["Missing or invalid status"];

    if (name.trim().length > 100)
      return ["name is too large, max length is 100 characters"];
    if (email.trim().length > 150)
      return ["email is too large, max length is 150 characters"];
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return ["Invalid email"];
    if (phone.trim().length > 20)
      return ["phone is too large, max length is 20 characters"];
    if (specialty.trim().length > 100)
      return ["specialty is too large, max length is 100 characters"];

    return [
      undefined,
      new CreateTeacherDTO(
        name.trim(),
        email.trim(),
        phone.trim(),
        specialty.trim(),
        status,
      ),
    ];
  }
}
