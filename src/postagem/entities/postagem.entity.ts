import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// Criar tabela no banco de dados
@Entity({name: "tb_postagens"})
export class Postagem {

    //Chave Primária Auto incremental
    @PrimaryGeneratedColumn()
    id: number
   
    // Bloquear apenas espaço em branco 
    @Transform(({ value }: TransformFnParams) => value?.trim())
    // Não aceitar titulo vazio 
    @IsNotEmpty()
    // Definir o tamanho e não aceitar valor nulo
    @Column({length: 100, nullable: false})
    titulo: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    texto: string;
    
    // Preencimento automático da data e hora
    @UpdateDateColumn()
    data: Date;
}