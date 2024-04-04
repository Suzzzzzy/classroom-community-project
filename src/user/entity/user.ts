import {
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
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @Column()
    email: String;

    @Column()
    @Exclude()
    password: String;

    @Column()
    firstName: String;

    @Column()
    lastName: String;

    @Column()
    profileImageUrl: String;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;


    @BeforeInsert()
    async hashPassword() {
        this.password = bcrypt.hashSync(this.password.toString(), 10);
    }
}

