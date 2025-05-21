import { z } from 'zod';
import { PrismaClient } from "@prisma/client";
import { despesasSchema, receitasSchema, userSchema } from "../models";

const prisma = new PrismaClient();

const cartaosSchema = z.object({
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

    users: userSchema,

    despesas: despesasSchema,

    receitas: receitasSchema,
});

export const cartaoValidator = (user, partial = null) => {
    if (partial) {
        return cartaosSchema.partial(partial).safeParse(user)
    }
    else {
        return cartaosSchema.safeParse(user)
    }
};

export async function create(cartao) {
    return await prisma.cartaos.create({
        data: cartao,
        select: {
            nome_cartao: true,
            icone_cartao: true;
            limite_cartao: true,
            id_user: true,
            users: true,
            despesas: true,
            receitas: true
        }
    })
    
};

export async function findAll() {
  return await prisma.cartaos.findMany();
}


export async function findById(id) {
  return await prisma.cartaos.findUnique({
    where: { id },
  });
}


export async function update(id, data) {
  return await prisma.cartaos.update({
    where: { id },
    data
  });
}


export async function remove(id) {
  return await prisma.cartaos.delete({
    where: { id },
  });
}

