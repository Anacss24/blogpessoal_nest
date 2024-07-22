import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { PostagemService } from "../service/postagem.service";
import { Postagem } from "../entities/postagem.entity";

@Controller("postagens")
export class PostagemController{
    
    constructor(private readonly postagemService: PostagemService){}

    @Get()
    @HttpCode(HttpStatus.OK) // Http Status 200
    findAll(): Promise<Postagem[]>{
        return this.postagemService.findAll();
    }
}