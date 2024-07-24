import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { TemaService } from "../service/tema.service";
import { Tema } from "../entities/tema.entity";

@Controller("temas")
export class TemaController {
    
    // O construtor injeta o serviço 'TemaService' que será utilizado pelos métodos do controlador.
    constructor(private readonly temaService: TemaService){}

   @Get()
   @HttpCode(HttpStatus.OK)
   // Retorna todas as postagens
   findAll(): Promise<Tema[]>{
    return this.temaService.findAll();
   }

   // Parâmetro de caminho = /temas/id
   @Get("/:id")
   @HttpCode(HttpStatus.OK)
   // 'ParseIntPipe' garantir que o 'id' seja um número inteiro
   findById(@Param('id', ParseIntPipe)id: number): Promise<Tema>{
    // Retorna a postagem específica pelo 'id'
    return this.temaService.findById(id);
   }
   
   // Parâmetro de caminho =  /temas/descricao/back-end
   @Get("/descricao/:descricao")
   @HttpCode(HttpStatus.OK)
   findByDescricao(@Param('descricao') descricao: string): Promise<Tema[]>{
    // Retorna postagens específicas pela descrição
    return this.temaService.findByDescricao(descricao);
   }
   
   // Criar um novo tema
   @Post()
   // Ao criar um tema com sucesso, retornar o status 201
   @HttpCode(HttpStatus.CREATED)
   create(@Body() tema: Tema): Promise<Tema>{
    // Retorna a postagem criada
    return this.temaService.create(tema)
   }

   // Atualizar um tema existente
   @Put()
   @HttpCode(HttpStatus.OK)
   update(@Body() tema: Tema): Promise<Tema>{
    // Retorna a postagem atualizada
    return this.temaService.update(tema)
   }

   @Delete("/:id")
   @HttpCode(HttpStatus.NO_CONTENT)
   delete(@Param('id', ParseIntPipe) id: number){
    // Não retorna conteúdo, status HTTP 204
    return this.temaService.delete(id);
   }

}

// As anotações (@Controller, @Get, @Post, @Put, @Delete, @HttpCode, etc.) são usadas de forma apropriada para configurar as rotas e os status HTTP.
