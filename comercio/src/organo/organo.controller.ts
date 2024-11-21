import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrganoService } from './organo.service';
import { CreateOrganoDto } from './dto/create-organo.dto';
import { UpdateOrganoDto } from './dto/update-organo.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseRoleGuard } from 'src/auth/guards/use-role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { getUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/auth.entity';

@Controller('organo')
export class OrganoController {
  constructor(private readonly organoService: OrganoService) {}

  @Post()
  @UseGuards(AuthGuard(), UseRoleGuard)
  @Roles('proveedor')
  create(@Body() createOrganoDto: CreateOrganoDto, @getUser() user: User) {
    return this.organoService.create(createOrganoDto, user);
  }

  @Post('comprar/:id')
  @UseGuards(AuthGuard(), UseRoleGuard)
  @Roles('cliente')
  comprar(@Param('id') id: string, @getUser() user: User) {
    return this.organoService.comprar(id, user);
  }

  @Get()
  //@UseGuards(AuthGuard(), UseRoleGuard)
  //@Roles('proveedor', 'cliente')
  findAll() {
    return this.organoService.findAll();
  }

  @Get('mis-ventas')
  @UseGuards(AuthGuard(), UseRoleGuard)
  @Roles('proveedor')
  findByProveedor(@getUser() user: User) {
    return this.organoService.findByProveedor(user);
  }

  @Get('mis-compras')
  @UseGuards(AuthGuard(), UseRoleGuard)
  @Roles('cliente')
  findByCliente(@getUser() user: User) {
    return this.organoService.findByCliente(user);
  }

  @Get(':id')
  @UseGuards(AuthGuard(), UseRoleGuard)
  @Roles('proveedor', 'cliente')
  findOne(@Param('id') id: string) {
    return this.organoService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard(), UseRoleGuard)
  @Roles('proveedor')
  update(@Param('id') id: string, @Body() updateOrganoDto: UpdateOrganoDto, @getUser() user: User) {
    return this.organoService.update(id, updateOrganoDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), UseRoleGuard)
  @Roles('proveedor')
  remove(@Param('id') id: string, @getUser() user: User) {
    return this.organoService.remove(id, user);
  }
}
