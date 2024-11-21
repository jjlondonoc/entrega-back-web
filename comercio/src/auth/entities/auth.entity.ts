import { MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text', {unique: true})
    @MinLength(4)
    email: string;

    @Column('text')
    @MinLength(8)
    password: string;

    @Column('boolean', {default: true})
    isActive: boolean;

    @Column('text', {array: true, nullable: false})
    @MinLength(1)
    roles: string[];
}
