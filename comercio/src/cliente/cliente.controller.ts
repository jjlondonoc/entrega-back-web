import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseRoleGuard } from 'src/auth/guards/use-role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { getUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/auth.entity';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  // Despúes de logueado, el cliente ingresa su info y así se "crea"
  @Post()
  @UseGuards(AuthGuard(), UseRoleGuard)
  @Roles('cliente')
  create(@Body() createClienteDto: CreateClienteDto, @getUser() user: User) {
    return this.clienteService.create(createClienteDto, user);
  }
  
  // Debe hacerlo un admin (por ahora todos pueden):
  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  // Debe hacerlo un admin (por ahora todos pueden):
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(id);
  }

  @Patch()
  @UseGuards(AuthGuard(), UseRoleGuard)
  @Roles('cliente')
  update(@Body() updateClienteDto: UpdateClienteDto, @getUser() user: User) {
    return this.clienteService.update(updateClienteDto, user);
  }

  @Delete()
  @UseGuards(AuthGuard(), UseRoleGuard)
  @Roles('cliente')
  remove(@getUser() user: User) {
    return this.clienteService.remove(user);
  }
}
