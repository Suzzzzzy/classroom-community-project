import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entity/user.entity";
import {Role} from "./role.entity";

@Entity('role_assignment')
export class RoleAssignment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.roleAssignments)
    @JoinColumn({name: "user_id", referencedColumnName: 'id'})
    user: User;

    @ManyToOne(() => Role, role => role.roleAssignments)
    @JoinColumn({name: "role_id", referencedColumnName: 'id'})
    role: Role;

    @Column({type: 'tinyint', comment: '소유자 권한 여부(0: 소유자 아님, 1: 소유자)', default: 0})
    isOwner: number;
}