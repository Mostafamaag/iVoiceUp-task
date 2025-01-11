import { Group } from "../../employee/enums/group.enum";
export declare class SignUpDto {
    name: string;
    email: string;
    password: string;
    group?: Group;
}
