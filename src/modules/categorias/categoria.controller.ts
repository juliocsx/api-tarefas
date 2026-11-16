import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriasService: CategoriaService) {}

  @Get()
  listar() {
    return this.categoriasService.listar();
  }

  @Post()
  criar(@Body() body: CreateCategoriaDto) {
    return this.categoriasService.criar(body);
  }

  @Patch(':id')
  atualizar(
    @Param('id', ParseIntPipe)
    id: number,
    @Body()
    body: UpdateCategoriaDto,
  ) {
    return this.categoriasService.atualizar(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  remover(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    this.categoriasService.remover(id);
  }
}
