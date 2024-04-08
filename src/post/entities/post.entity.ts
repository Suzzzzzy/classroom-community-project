import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {PostType} from "../type/post-type";
import {Space} from "../../space/entities/space.entity";
import {User} from "../../user/entity/user.entity";
import {Chat} from "./chat.entity";
import {Exclude} from "class-transformer";

@Entity({name: 'post'})
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    userId: number;

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({name: "userId", referencedColumnName: 'id'})
    user: User;

    @Column({nullable: true})
    spaceId: number;

    @ManyToOne(() => Space, space => space.posts)
    @JoinColumn([{name: 'spaceId', referencedColumnName: 'id'}])
    space: Space;

    @Column({type: "enum", enum: PostType})
    postType: PostType;

    @Column()
    title: string;

    @Column({type: 'varchar', length: 1000})
    content: string;

    @Column()
    isAnonymous: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date | null;

    @OneToMany(() => Chat, (chat ) => chat.post)
    chats: Chat[];
}
