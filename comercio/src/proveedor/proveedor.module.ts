import { Module } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { ProveedorController } from './proveedor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor } from './entities/proveedor.entity';
import { User } from 'src/auth/entities/auth.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProveedorController],
  providers: [ProveedorService],
  imports: [TypeOrmModule.forFeature([Proveedor, User]), AuthModule]
})
export class ProveedorModule {}
