import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(@InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>) {}

  // "Crea al cliente", ya tiene usuario y lo asocia
  async create(createClienteDto: CreateClienteDto, usuario: User) {
    // Verificar si el usuario ya tiene un cliente asociado
    const clienteExistente = await this.clienteRepository.findOne({ where: { user: { id: usuario.id } } });
    if (clienteExistente) {
        throw new BadRequestException('Ya existe un perfil de cliente para este usuario');
    }
    const cliente = this.clienteRepository.create({...createClienteDto, user: usuario});
    await this.clienteRepository.save(cliente);
    return cliente;
  }

  async findAll() {
    const clientes = await this.clienteRepository.find({relations: ['user', 'organos']});
    return clientes;
  }

  async findOne(id: string) {
    const cliente = await this.clienteRepository.findOneBy({id:id});
    if(!cliente) {
      throw new NotFoundException(`Cliente con id #${id} no encontrado`)
    }
    return cliente;
  }

  async update(updateClienteDto: UpdateClienteDto, usuario: User) {
    const cliente = await this.clienteRepository.findOne({where: {user: {id: usuario.id}}, relations: ['user']})
    const clienteUpdate = await this.clienteRepository.preload({id:cliente.id, ...updateClienteDto });
    await this.clienteRepository.save(clienteUpdate);
    return clienteUpdate;
  }

  async remove(usuario: User) {
    const cliente = await this.clienteRepository.findOne({where:{user:{id: usuario.id}}, relations: ['user']});
    await this.clienteRepository.delete(cliente.id);
    return cliente;
  }
}
