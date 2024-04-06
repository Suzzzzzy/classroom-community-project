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

@Entity({name: 'space'})
export class Space extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    name: string;

    @Column()
    logoImageUrl: string;

    @Column()
    adminAccessCode: string;

    @Column()
    memberAccessCode: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;



    @BeforeInsert()
    @BeforeUpdate()
    generateAccessCodes() {
        if (!this.adminAccessCode) {
            this.adminAccessCode = this.generateRandomCode();
        }
        if (!this.memberAccessCode) {
            this.memberAccessCode = this.generateRandomCode();
        }
    }

    private generateRandomCode(): string {
        const length = 8;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

}