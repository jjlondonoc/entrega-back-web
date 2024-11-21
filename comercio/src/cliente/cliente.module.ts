import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { User } from 'src/auth/entities/auth.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ClienteController],
  providers: [ClienteService],
  imports: [TypeOrmModule.forFeature([Cliente, User]), AuthModule]
})
export class ClienteModule {}
