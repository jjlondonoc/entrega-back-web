import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h1><strong>Bienvenido al comercio de la vida, donde te damos una nueva oportunidad de vida</strong></h1>';
  }
}
