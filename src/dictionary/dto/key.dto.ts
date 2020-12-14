import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Key {

    @ApiProperty() @IsString() @IsNotEmpty()
    readonly key: string;
    
}