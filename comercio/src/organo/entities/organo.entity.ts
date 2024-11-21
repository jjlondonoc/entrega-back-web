import { Cliente } from "src/cliente/entities/cliente.entity";
import { Proveedor } from "src/proveedor/entities/proveedor.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {nullable: false})
    nombre: string;

    @Column('text', {nullable: false})
    tipoSangre: string;

    @Column('text', {nullable: false})
    rh: string;

    @Column('int')
    edad: number;

    @Column('text', {nullable: true})
    descripcionDonante: string;

    @Column('text', {nullable: false})
    antecedentesDonante: string;

    @Column('boolean', {default: false, nullable: false})
    cirugiasPrevias: boolean;

    @Column('boolean', {default: true, nullable: false})
    disponible: boolean;

    @Column('float', {nullable: false})
    precio: number;

    @ManyToOne(() => Proveedor, (proveedor) => proveedor.organos)
    proveedor: Proveedor;

    @ManyToOne(() => Cliente, (cliente) => cliente.organos)
    cliente: Cliente;
}
