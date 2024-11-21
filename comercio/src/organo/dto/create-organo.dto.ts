import { IsString, MinLength, IsIn, IsNumber, IsInt, Min, IsOptional, IsBoolean, IsUUID } from "class-validator";

export class CreateOrganoDto {
    @IsString({message: 'El valor de la llave debe ser String'})
    @MinLength(1, {message: 'Ingrese al menos un caracter'})
    nombre: string;

    @IsString({message: 'El valor de la llave debe ser String'})
    @IsIn(['A', 'B', 'O', 'AB'], {message: 'El tipo de sangre debe ser A, B, O, o AB' })
    tipoSangre: string;

    @IsString({message: 'El valor de la llave debe ser String'})
    @IsIn(['+', '-'], {message: 'El Rh debe ser + o -' })
    rh: string;

    @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'La edad debe ser un número válido' })
    @IsInt({message: 'Ingrese un valor entero'})
    @Min(1, {message: 'No aceptamos órganos para neonatos'})
    edad: number;

    @IsOptional()
    @IsString({message: 'El valor de la llave debe ser String'})
    @MinLength(1, {message: 'Ingrese al menos un caracter'})
    descripcionDonante: string;

    @IsString({message: 'El valor de la llave debe ser String'})
    @MinLength(1, {message: 'Ingrese al menos un caracter'})
    antecedentesDonante: string;

    @IsBoolean({message: 'Ingrese un dato booleano'})
    cirugiasPrevias: boolean;

    @IsOptional()
    @IsBoolean({message: 'Ingrese un dato booleano'})
    disponible: boolean;

    @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'El precio debe ser un número válido' })
    @Min(0, { message: 'El precio no puede ser negativo' })
    precio: number;
}
