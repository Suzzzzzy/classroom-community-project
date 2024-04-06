import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn, ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Role} from "../../role/entities/role.entity";
import {Space} from "./space.entity";

@Entity({name: 'accessCode'})
export class AccessCode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accessType: string;

    @Column()
    accessCode: string;

    @ManyToOne(() => Space, space => space.roles)
    @JoinColumn([{name: 'space_id', referencedColumnName: 'id'}])
    space: Space;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date | null;
}