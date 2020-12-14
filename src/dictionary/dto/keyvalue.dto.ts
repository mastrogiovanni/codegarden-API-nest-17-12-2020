import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class KeyValue {

    @ApiProperty() @IsString()
    readonly key: string;

    @ApiProperty() @IsString()
    readonly value: string;
    
}