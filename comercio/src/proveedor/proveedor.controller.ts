import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseRoleGuard } from 'src/auth/guards/use-role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { getUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/auth.entity';

@Controller('proveedor')
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

  // Despúes de logueado, el proveedor ingresa su info y así se "crea"
  @Post()
  @UseGuards(AuthGuard(), UseRoleGuard)
  @Roles('proveedor')
  create(@Body() createProveedorDto: CreateProveedorDto, @getUser() user: User) {
    return this.proveedorService.create(createProveedorDto, user);
  }

  // Debe hacerlo un admin (por ahora todos pueden):
  @Get()
  findAll() {
    return this.proveedorService.findAll();
  }

  // Debe hacerlo un admin (por ahora todos pueden):
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proveedorService.findOne(id);
  }

  @Patch()
  @UseGuards(AuthGuard(), UseRoleGuard)
  @Roles('proveedor')
  update(@Body() updateProveedorDto: UpdateProveedorDto, @getUser() user: User) {
    return this.proveedorService.update(updateProveedorDto, user);
  }

  @Delete()
  @UseGuards(AuthGuard(), UseRoleGuard)
  @Roles('proveedor')
  remove(@getUser() user: User) {
    return this.proveedorService.remove(user);
  }
}
