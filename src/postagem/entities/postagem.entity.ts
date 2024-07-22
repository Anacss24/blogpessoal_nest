import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// Criar tabela no banco de dados
@Entity({name: "tb_postagens"})
export class Postagem {

    //Chave Primária Auto incremental
    @PrimaryGeneratedColumn()
    id: number
    
    // Não aceitar titulo vazio 
    @IsNotEmpty()
    // Definir o tamanho e não aceitar valor nulo
    @Column({length: 100, nullable: false})
    titulo: string;

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    texto: string;
    
    // Preencimento automático da data e hora
    @UpdateDateColumn()
    data: Date;
}