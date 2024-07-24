import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tema } from "../entities/tema.entity";

@Injectable()
export class TemaService {

    // Injeta o repositório da entidade Tema
    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>
    ) { }

    // Retorna todas as entidades Tema, incluindo suas relações com Postagem
    async findAll(): Promise<Tema[]> {
        return await this.temaRepository.find({
            relations: {
                postagem: true
            }
        });
    }

    // Retorna uma entidade Tema pelo ID, incluindo suas relações com Postagem
    async findById(id: number): Promise<Tema> {
        let buscarTema = await this.temaRepository.findOne({
            where: { id },
            relations: {
                postagem: true
            }
        })
        // Lança uma exceção se o Tema não for encontrado
        if (!buscarTema)
            throw new HttpException('O tema não foi encontrado!', HttpStatus.NOT_FOUND)

        return buscarTema;
    }

    async findByDescricao(descricao: string): Promise<Tema[]> {
        return await this.temaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`)
            },
            relations: {
                postagem: true
            }
        })
    }

    async create(tema: Tema): Promise<Tema> {
        return await this.temaRepository.save(tema)
    }

    async update(tema: Tema): Promise<Tema> {
        let buscarTema = await this.findById(tema.id);

        if (!buscarTema || !tema.id)
            throw new HttpException('O Tema não foi encontrado!', HttpStatus.NOT_FOUND)

        return await this.temaRepository.save(tema)
    }

    async delete(id: number): Promise<DeleteResult> {
        let buscarTema = await this.findById(id)
        if (!buscarTema)
            throw new HttpException('O tema não foi encontrado!', HttpStatus.NOT_FOUND)

        return await this.temaRepository.delete(id);
    }
}