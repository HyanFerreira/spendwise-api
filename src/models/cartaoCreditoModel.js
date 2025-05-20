import { z } from 'zod';
import { PrismaClient } from "@prisma/client";
import { despesasSchema, receitasSchema } from "../models";

const prisma = new PrismaClient();

const cartaoCreditoSchema = z.object({
    nome_cartao: z
    .string({ invalid_type_error: "Nome do cartão de crédito deve ser texto"})
    .max(255, "Máximo de 255 caracteres"),

    icone_cartao: z
    .string({ invalid_type_error: "Link do ícone do cartão deve ser texto"})
    .max(500, "Máximo de 500 caracteres")
    .nullable()
    .optional(),

    limite_cartao: z
    .number({invalid_type_error: "Valor do limite do cartão deve ser número"}).nonnegative(),


    id_user: z
    .number({ invalid_type_error: "ID da conta deve ser número" }).nonnegative()
    .int("ID do usuário dever ser inteiro"),

    despesas: despesasSchema,

    receitas: receitasSchema,
});

export async function create(cartao) {
    return await prisma.cartaos.create({
        data: cartao,
        select: {
            nome_cartao: true,
            icone_cartao: true;
            limite_cartao: true,
            id_user: true,
            despesas: true,
            receitas: true
        }
    })
    
}