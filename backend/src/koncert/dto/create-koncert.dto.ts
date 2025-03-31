import { IsDateString, IsNotEmpty, IsString, IsBoolean, IsOptional, IsInt } from "class-validator"

export class CreateKoncertDto {
    @IsString()
    @IsNotEmpty()
    fellepo: string

    @IsDateString()
    kezdesiIdo: string

    @IsInt()
    idotartam: number

    @IsBoolean()
    @IsOptional()
    elmaradE?: boolean
}
