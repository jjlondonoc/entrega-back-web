import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/log-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}
  
  async create(createAuthDto: CreateAuthDto, roles: string[]) {
    try {
      const user = this.userRepository.create({
        ...createAuthDto,
        roles
      });
      user.password = await bcrypt.hash(user.password, 10);
      await this.userRepository.save(user);
      return user;
    } catch(err) {
      throw new BadRequestException(err.detail);
    }
  }

  async findAll() {
    const users = await this.userRepository.find({});
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({id:id});
    if(!user) {
      throw new NotFoundException(`Usuario con id #${id} no encontrado`)
    }
    return user;
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    const user = await this.userRepository.preload({id:id, ...updateAuthDto});
    if(!user) {
      throw new NotFoundException(`Usuario con id #${id} no encontrado`);
    }
    await this.userRepository.save(user);
    return user;
  }

  async remove(id: string) {
    const user = await this.userRepository.delete({id:id});
    if(user.affected === 0) {
      throw new NotFoundException(`Usuario con id #${id} no encontrado`);
    }
    return user;
  }

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const {email, password} = loginAuthDto;
      const user = await this.userRepository.findOneBy({email});
      if(!user) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      const isValid = bcrypt.compareSync(password, user.password);
      if(!isValid) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      const {name} = user;
      const jwt = this.jwtService.sign({name, email});
      
      return {user: {name, email, jwt}};
    } catch(err) {
      throw new UnauthorizedException(err.detail);
    }
  }
}
