import { IsArray, IsIn, IsInt, IsNumber, IsString, Matches, Min, MinLength } from "class-validator";

export class CreateClienteDto {
    @IsString({message: 'El valor de la llave debe ser String'})
    @MinLength(1, {message: 'Debe enviar al menos un caracter'})
    sexo: string;

    @IsNumber()
    @IsInt({message: 'Ingrese un valor entero'})
    @Min(18, {message: 'Debe ser mayor de edad'})
    edad: number;

    @IsNumber()
    @IsInt({message: 'Ingrese la estatura como un número entero, exprésela en cm'})
    @Min(100, {message: 'Enanos no por favor'})
    estatura: number;

    @IsString({message: 'El valor de la llave debe ser String'})
    @IsIn(['A', 'B', 'O', 'AB'], {message: 'El tipo de sangre debe ser A, B, O, o AB' })
    tipoSangre: string;

    @IsString({message: 'El valor de la llave debe ser String'})
    @IsIn(['+', '-'], {message: 'El Rh debe ser + o -' })
    rh: string;

    @IsArray({message: 'Ingrese un arreglo'})
    @IsString({each: true , message: 'El valor de la llave debe ser String'})
    enfermedadesCronicas: string[]

    @IsArray({message: 'Ingrese un arreglo'})
    @IsString({each: true , message: 'El valor de la llave debe ser String'})
    medicamentos: string[]
}
