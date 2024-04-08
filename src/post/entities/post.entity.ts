import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {PostType} from "../type/post-type";
import {Space} from "../../space/entities/space.entity";
import {User} from "../../user/entity/user.entity";

@Entity({name: 'post'})
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.roleAssignments)
    @JoinColumn({name: "user_id", referencedColumnName: 'id'})
    user: User;

    @ManyToOne(() => Space, space => space.roles)
    @JoinColumn([{name: 'space_id', referencedColumnName: 'id'}])
    space: Space;

    @Column({type: "enum", enum: PostType})
    postType: PostType;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    isAnonymous: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date | null;
}
