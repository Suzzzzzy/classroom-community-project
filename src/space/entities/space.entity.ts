import {
    BaseEntity,
    BeforeInsert, BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Role} from "../../role/entities/role.entity";
import {Post} from "../../post/entities/post.entity";

@Entity({name: 'space'})
export class Space {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    name: string;

    @Column()
    logoImageUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date | null;

    @OneToMany(() => Role, (role) => role.space)
    roles: Role[];

    @OneToMany(() => Post, (post) => post.space)
    posts: Post[];
}