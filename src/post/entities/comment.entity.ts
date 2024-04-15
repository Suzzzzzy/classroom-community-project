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
import {Reply} from "./reply.entity";


@Entity({name: 'comment'})
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    userId: number;

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({name: "userId", referencedColumnName: 'id'})
    user: User;

    @Column({nullable: true})
    replyId: number;

    @ManyToOne(() => Reply, reply => reply.comments)
    @JoinColumn([{name: 'replyId', referencedColumnName: 'id'}])
    reply: Reply;

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
