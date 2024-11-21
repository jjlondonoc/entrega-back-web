import { Module } from '@nestjs/common';
import { OrganoService } from './organo.service';
import { OrganoController } from './organo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organo } from './entities/organo.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Proveedor } from 'src/proveedor/entities/proveedor.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Module({
  controllers: [OrganoController],
  providers: [OrganoService],
  imports: [TypeOrmModule.forFeature([Organo, Cliente, Proveedor]), AuthModule]
})
export class OrganoModule {}
