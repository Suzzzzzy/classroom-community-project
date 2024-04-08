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
import {Chat} from "./chat.entity";


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
    chatId: number;

    @ManyToOne(() => Chat, chat => chat.comments)
    @JoinColumn([{name: 'chatId', referencedColumnName: 'id'}])
    chat: Chat;

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
