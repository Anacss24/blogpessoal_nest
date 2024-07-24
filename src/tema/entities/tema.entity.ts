import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";

// Define que esta classe representa a tabela "tb_temas"
@Entity({ name: "tb_temas" })
export class Tema {
    
    // Define a coluna "id" como chave primária gerada automaticamente
    @PrimaryGeneratedColumn()
    id: number;
    
    // Remove espaços em branco no início e no fim do valor da descrição
    @Transform(({ value }: TransformFnParams) => value?.trim())
    // Valida que a descrição não pode estar vazia
    @IsNotEmpty() // Garante que o valor do campo não seja uma string vazia, útil para validação de dados na aplicação.
     // Define a coluna "descricao" com tamanho máximo de 1000 caracteres e não permite valor nulo
    @Column({ length: 1000, nullable: false }) // Garante que o campo não armazene valores nulos no banco de dados, útil para integridade dos dados no esquema do banco de dados.
    descricao: string;
   
    // // Define a relação de um para muitos com a entidade "Postagem"
    @OneToMany(() => Postagem, (postagem) => postagem.tema)

    postagem: Postagem[]
}