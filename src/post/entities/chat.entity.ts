import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../../user/entity/user.entity";
import {Post} from "./post.entity";
import {Comment} from "./comment.entity";


@Entity({name: 'chat'})
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    userId: number;

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({name: "userId", referencedColumnName: 'id'})
    user: User;

    @Column({nullable: true})
    postId: number;

    @ManyToOne(() => Post, post => post.chats)
    @JoinColumn([{name: 'postId', referencedColumnName: 'id'}])
    post: Post;

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

    @OneToMany(() => Comment, (comment ) => comment.chat)
    comments: Comment[];
}
