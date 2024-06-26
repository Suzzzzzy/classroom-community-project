import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import {Space} from "../../space/entities/space.entity";
import {RoleAccessType} from "../type/role-access-type";
import {RoleAssignment} from "./role-assignment";

@Entity({name: 'role'})
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: RoleAccessType,
    })
    accessType: RoleAccessType;

    @Column()
    name: string;

    @Column({nullable: true})
    spaceId: number;

    @ManyToOne(() => Space, space => space.roles)
    @JoinColumn([{name: 'spaceId', referencedColumnName: 'id'}])
    space: Space;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date | null;

    @OneToMany(() => RoleAssignment, (roleAssignment) => roleAssignment.role, { cascade: true })
    roleAssignments: RoleAssignment[];
}
