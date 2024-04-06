import {Column, CreateDateColumn, DeleteDateColumn, JoinColumn, PrimaryGeneratedColumn} from "typeorm";
import {Space} from "../../space/entities/space.entity";
import {RoleAccessType} from "../type/role-access-type";

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

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date | null;

    @JoinColumn([{name: 'space_id', referencedColumnName: 'id'}])
    space: Space;
}
