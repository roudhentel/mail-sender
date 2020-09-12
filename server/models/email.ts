import { IsDefined, IsEmail, Length, IsArray, ArrayNotEmpty, ArrayMaxSize } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class EmailModel {
    @Expose()
    @IsDefined()
    @Length(1, 200)
    subject!: string;

    @Expose()
    @IsDefined()
    @Length(1)
    body!: string;

    @Expose()
    @IsDefined()
    @IsEmail()
    from!: string;

    @Expose()
    @IsDefined()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMaxSize(50)
    @IsEmail({}, { each: true })
    to!: Array<string>;

    @Expose()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMaxSize(50)
    @IsEmail({}, { each: true })
    cc!: Array<string>;

    @Expose()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMaxSize(50)
    @IsEmail({}, { each: true })
    bcc!: Array<string>;
}