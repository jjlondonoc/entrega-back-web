import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';


export class CreateAuthDto {

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(12)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Contraseña muy débil'})
    password: string;

    @IsString()
    @MinLength(1)
    name: string;
}
