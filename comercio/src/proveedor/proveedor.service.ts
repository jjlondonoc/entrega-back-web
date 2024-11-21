import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedor } from './entities/proveedor.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';

@Injectable()
export class ProveedorService {
  constructor(@InjectRepository(Proveedor) private readonly proveedorRepository: Repository<Proveedor>) {}

  // "Crea al proveedor", ya tiene usuario y lo asocia
  async create(createProveedorDto: CreateProveedorDto, usuario: User) {
    // Verificar si el usuario ya tiene un cliente asociado
    const proveedorExistente = await this.proveedorRepository.findOne({ where: { user: { id: usuario.id } } });
    if (proveedorExistente) {
        throw new BadRequestException('Ya existe un perfil de proveedor para este usuario');
    }
    const proveedor = this.proveedorRepository.create({...createProveedorDto, user: usuario});
    await this.proveedorRepository.save(proveedor);
    return proveedor;
  }

  async findAll() {
    const proveedores = await this.proveedorRepository.find({relations: ['user']});
    return proveedores;
  }

  async findOne(id: string) {
    const proveedor = this.proveedorRepository.findOneBy({id:id})
    if(!proveedor) {
      throw new NotFoundException(`Proveedor con id #${id} no encontrado`)
    }
    return proveedor;
  }

  async update(updateProveedorDto: UpdateProveedorDto, usuario: User) {
    const proveedor = await this.proveedorRepository.findOne({where: {user: {id: usuario.id}}, relations: ['user']});
    const proveedorUpdate = await this.proveedorRepository.preload({id: proveedor.id, ...updateProveedorDto});
    await this.proveedorRepository.save(proveedorUpdate);
    return proveedorUpdate;
  }

  async remove(usuario: User) {
    const proveedor = await this.proveedorRepository.findOne({where:{user:{id: usuario.id}}, relations: ['user']});
    await this.proveedorRepository.delete(proveedor.id);
    return proveedor;
  }
}
