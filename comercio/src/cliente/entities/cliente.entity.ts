import { User } from "src/auth/entities/auth.entity";
import { Organo } from "src/organo/entities/organo.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    sexo: String;

    @Column('int')
    edad: number;

    @Column('int')
    estatura: number;
    
    @Column('text')
    tipoSangre: string;

    @Column('text')
    rh: string;

    @Column('text', {array: true, default: ['Ninguna']})
    enfermedadesCronicas: string[];

    @Column('text', { array: true, default: ['Ninguno']})
    medicamentos: string[];

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToMany(() => Organo, (organo) => organo.cliente)
    organos: Organo[];
}
