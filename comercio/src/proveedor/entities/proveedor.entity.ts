import { Organo } from "src/organo/entities/organo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "src/auth/entities/auth.entity";

@Entity()
export class Proveedor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {array: true, default: ['Colombia']})
    paisesEnvio: string[];

    @OneToMany(() => Organo, (organo) => organo.proveedor)
    organos: Organo[];

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}
