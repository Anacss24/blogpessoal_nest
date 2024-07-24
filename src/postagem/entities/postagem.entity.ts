import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";

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

    // Relacionamento de Muitos para Um, Muitas postagens, possuem um tema
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
         // Configura a exclusão em cascata
         //Especifica que, quando um registro de Tema for deletado, todas as postagens relacionadas a esse Tema também serão deletadas automaticamente.
        onDelete: 'CASCADE'
    })
    // // Propriedade para a relação com a entidade Tema
    tema: Tema;
}