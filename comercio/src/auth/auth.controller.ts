import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/log-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registro-cliente')
  createCliente(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto, ['cliente']);
  }

  @Post('registro-proveedor')
  createProveedor(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto, ['proveedor']);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  // Debe hacerlo un admin:
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  // Debe hacerlo un admin:
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  // Debe hacerlo un admin:
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }

  // Debe hacerlo un admin:
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
