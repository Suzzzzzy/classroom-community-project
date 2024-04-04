import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import * as bcrypt from 'bcrypt';
import {Exclude} from "class-transformer";


@Entity({name: 'users'})
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    profileImageUrl: string;

    @CreateDateColumn({ name: 'create_at', comment: '생성일자' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', comment: '수정일자' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', comment: '삭제일자' })
    deletedAt?: Date | null;


    @BeforeInsert()
    async hashPassword() {
        this.password = bcrypt.hashSync(this.password.toString(), 10);
    }
}

