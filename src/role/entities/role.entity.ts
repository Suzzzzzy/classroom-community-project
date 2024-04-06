import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {Space} from "../../space/entities/space.entity";
import {RoleAccessType} from "../type/role-access-type";
import {spec} from "node:test/reporters";

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

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date | null;

    @ManyToOne(() => Space, space => space.roles, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{name: 'space_id', referencedColumnName: 'id'}])
    space: Space;
}
