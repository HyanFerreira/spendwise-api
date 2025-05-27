import { z } from 'zod';
import { PrismaClient } from "@prisma/client";


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
      .number({ invalid_type_error: "ID da usuário deve ser número" }).nonnegative()
      .int("ID do usuário dever ser inteiro"),

    id_receitas: z
      .number({ invalid_type_error: "ID da receita deve ser número" }).nonnegative()
      .int("ID da receita dever ser inteiro"),

    id_despesas: z
      .number({ invalid_type_error: "ID da despesa deve ser número" }).nonnegative()
      .int("ID da despesa dever ser inteiro")


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
    return await prisma.cartao.create({
        data: cartao,
        select: {
            nome_cartao: true,
            icone_cartao: true,
            limite_cartao: true,
            id_user: true,
            id_receitas: true,
            id_despesas: true
    })
    
};

export async function findAll() {
  return await prisma.cartao.findMany();
};


export async function findById(id) {
  return await prisma.cartao.findUnique({
    where: { id },
  });
};


export async function update(id, data) {
  return await prisma.cartao.update({
    where: { id },
    data
  });
};


export async function remove(id) {
  return await prisma.cartao.delete({
    where: { id },
  });
};

