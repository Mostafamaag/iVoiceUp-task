import { SetMetadata } from "@nestjs/common";
import { Group as Role } from "../../employee/enums/group.enum";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);