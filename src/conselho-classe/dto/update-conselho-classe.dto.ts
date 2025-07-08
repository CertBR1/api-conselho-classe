import { PartialType } from '@nestjs/mapped-types';
import { CreateConselhoClasseDto } from './create-conselho-classe.dto';

export class UpdateConselhoClasseDto extends PartialType(CreateConselhoClasseDto) {}
