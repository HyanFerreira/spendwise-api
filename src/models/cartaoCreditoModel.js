import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cartaosSchema = z.object({
  nome_cartao: z
    .string({ invalid_type_error: "Nome do cartão de crédito deve ser texto" })
    .max(255, "Máximo de 255 caracteres"),

  icone_cartao: z
    .string({ invalid_type_error: "Link do ícone do cartão deve ser texto" })
    .max(500, "Máximo de 500 caracteres")
    .nullable()
    .optional(),

  limite_cartao: z
    .number({ invalid_type_error: "Valor do limite do cartão deve ser número" })
    .nonnegative(),

  limite_disponivel: z.number({
    invalid_type_error: "O valor do limite disponivel deve ser numérico"
  }),

  limite_usado: z.number({
    invalid_type_error: "O valor do limite usado deve ser numérico"
  }),

  id_user: z
    .number({ invalid_type_error: "ID da usuário deve ser número" })
    .nonnegative()
    .int("ID do usuário dever ser inteiro")
});

export const cartaoValidator = (user, isPartial = false) => {
  if (isPartial) {
    return cartaosSchema.partial().safeParse(user);
  } else {
    return cartaosSchema.safeParse(user);
  }
};

export async function create(cartao) {
  return await prisma.cartao_credito.create({
    data: cartao,
    select: {
      nome_cartao: true,
      icone_cartao: true,
      limite_cartao: true,
      limite_disponivel: true,
      limite_usado: true,
      id_user: true,
      receitas: {
        select: {
          id: true,
          valor_receita: true
        }
      },
      despesas: {
        select: {
          id: true,
          valor_despesa: true
        }
      }
    }
  });
}

export async function findAll() {
  return await prisma.cartao_credito.findMany();
}

export async function findById(id) {
  return await prisma.cartao_credito.findUnique({
    where: { id }
  });
}

export async function findCartoesByUserId(userId) {
  return await prisma.cartao_credito.findMany({
    where: { id_user: userId },
    select: {
      id: true,
      nome_cartao: true,
      icone_cartao: true,
      limite_cartao: true,
      limite_disponivel: true,
      limite_usado: true
    }
  });
}

export async function update(id, data) {
  return await prisma.cartao_credito.update({
    where: { id },
    data
  });
}

export async function remove(id) {
  return await prisma.cartao_credito.delete({
    where: { id }
  });
}
