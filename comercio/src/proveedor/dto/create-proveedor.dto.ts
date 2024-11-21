import { IsArray, IsString } from "class-validator";

export class CreateProveedorDto {
    @IsArray()
    @IsString({each: true, message: 'El valor de la llave debe ser String'})
    paisesEnvio: string[];
}
