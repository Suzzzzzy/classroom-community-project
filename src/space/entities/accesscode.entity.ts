import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn, ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import {Space} from "./space.entity";

@Entity({name: 'access_code'})
export class AccessCode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accessType: string;

    @Column()
    accessCode: string;

    @ManyToOne(() => Space, space => space.roles)
    @JoinColumn([{name: 'spaceId', referencedColumnName: 'id'}])
    space: Space;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date | null;
}