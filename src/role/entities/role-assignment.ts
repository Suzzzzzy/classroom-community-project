import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../../user/entity/user.entity";
import {Role} from "./role.entity";

@Entity('role_assignment')
export class RoleAssignment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @ManyToOne(() => User, user => user.roleAssignments)
    @JoinColumn({name: "userId", referencedColumnName: 'id'})
    user: User;

    @Column()
    roleId: number;

    @ManyToOne(() => Role, role => role.roleAssignments)
    @JoinColumn({name: "roleId", referencedColumnName: 'id'})
    role: Role;

    @Column({type: 'tinyint', comment: '소유자 권한 여부(0: 소유자 아님, 1: 소유자)', default: 0})
    isOwner: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date | null;
}