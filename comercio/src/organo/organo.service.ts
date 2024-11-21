import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateOrganoDto } from './dto/create-organo.dto';
import { UpdateOrganoDto } from './dto/update-organo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organo } from './entities/organo.entity';
import { Repository } from 'typeorm';
import { Proveedor } from 'src/proveedor/entities/proveedor.entity';
import { User } from 'src/auth/entities/auth.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Injectable()
export class OrganoService {

  constructor(
    @InjectRepository(Organo)
    private readonly organoRepository: Repository<Organo>,
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>
  ) {}

  async create(createOrganoDto: CreateOrganoDto, usuario: User) {
    const proveedor = await this.proveedorRepository.findOne({where:{ user: {id: usuario.id}}});
    if(!proveedor) {
      throw new BadRequestException('Debe primero ingresar todos sus datos para crear su cuenta')
    }
    const organo = this.organoRepository.create({
      ...createOrganoDto,
      proveedor
    })
    await this.organoRepository.save({...organo, usuario});
    return organo;
  }

  async findAll() {
    const organos = await this.organoRepository.find({relations: ['proveedor']});
    return organos;
  }

  async findOne(id: string) {
    const organo = await this.organoRepository.findOneBy({id:id});
    if(!organo) {
      throw new NotFoundException(`Órgano con id #${id} no encontrado`);
    }
    return organo;
  }

  async findByProveedor(usuario: User) {
    const proveedor = await this.proveedorRepository.findOne({where:{ user:{id: usuario.id}}, relations: ['organos', 'organos.cliente']});
    if(!proveedor) {
      throw new BadRequestException('No autorizado');
    }
    return proveedor.organos;
  }

  async findByCliente(usuario: User) {
    const cliente = await this.clienteRepository.findOne({where:{ user:{id: usuario.id}}, relations: ['organos']});
    if(!cliente) {
      throw new BadRequestException('No autorizado');
    }
    return cliente.organos;
  }

  async update(id: string, updateOrganoDto: UpdateOrganoDto, usuario: User) {
    const proveedor = await this.proveedorRepository.findOne({where:{user:{id: usuario.id}}})
    const organo = await this.organoRepository.findOne({where: {id}, relations: ['proveedor']});
    if(!organo) {
      throw new NotFoundException(`Órgano con id #${id} no encontrado`);
    }
    if(!organo.proveedor || organo.proveedor.id != proveedor.id) {
      throw new UnauthorizedException('No tiene permiso para modificar este órgano');
    }
    const organoNew = await this.organoRepository.preload({id:id, ...updateOrganoDto});
    await this.organoRepository.save(organoNew);
    return organoNew;
  }

  async remove(id: string, usuario: User) {
    const proveedor = await this.proveedorRepository.findOne({where:{user:{id: usuario.id}}});
    const organo = await this.organoRepository.findOne({ where: {id}, relations: ['proveedor'] });
    if (!organo) {
      throw new NotFoundException(`órgano con id #${id} no encontrado`);
    }
    if(organo.proveedor.id != proveedor.id) {
      throw new UnauthorizedException('No tiene permiso para eliminar este órgano');
    }
    await this.organoRepository.delete(organo.id);
    return organo;
  }

  async comprar(id: string, usuario: User) {
    const cliente = await this.clienteRepository.findOne({where:{user:{id: usuario.id}}});
    if(!cliente) {
      throw new BadRequestException('Debe primero ingresar todos sus datos para crear su cuenta y poder comprar')
    }
    const organo = await this.organoRepository.findOne({where:{id: id, disponible: true}});
    if(!organo) {
      throw new NotFoundException(`El órgano con id #${id} no encontrado o no disponible para la compra`);
    }
    organo.disponible = false;
    organo.cliente = cliente;
    await this.organoRepository.save(organo);
    return cliente;
  }
}
