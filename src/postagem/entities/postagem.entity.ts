import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

// Criar tabela no banco de dados
@Entity({name: "tb_postagens"})
export class Postagem {
     
    @ApiProperty() 
    //Chave Primária Auto incremental
    @PrimaryGeneratedColumn()
    id: number
   
    @ApiProperty() 
    // Bloquear apenas espaço em branco 
    @Transform(({ value }: TransformFnParams) => value?.trim())
    // Não aceitar titulo vazio 
    @IsNotEmpty()
    // Definir o tamanho e não aceitar valor nulo
    @Column({length: 100, nullable: false})
    titulo: string;

    @ApiProperty() 
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    texto: string;
    
    @ApiProperty() 
    // Preencimento automático da data e hora
    @UpdateDateColumn()
    data: Date;

    @ApiProperty({type: () => Tema})
    // Relacionamento de Muitos para Um, Muitas postagens, possuem um tema
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
         // Configura a exclusão em cascata
         //Especifica que, quando um registro de Tema for deletado, todas as postagens relacionadas a esse Tema também serão deletadas automaticamente.
        onDelete: 'CASCADE'
    })
    // // Propriedade para a relação com a entidade Tema
    tema: Tema;


    @ApiProperty({type: () => Usuario})
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        // Configura a exclusão em cascata
        //Especifica que, quando um registro de Tema for deletado, todas as postagens relacionadas a esse Tema também serão deletadas automaticamente.
       onDelete: 'CASCADE'
   })
   // // Propriedade para a relação com a entidade Tema
   usuario: Usuario;
}