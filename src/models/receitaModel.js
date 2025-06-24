import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const receitasSchema = z.object({
  nome_receita: z
    .string({ invalid_type_error: "Nome da receita deve ser texto" })
    .max(255, "Máximo de 255 caracteres")
    .nullable()
    .optional(),

  desc_receita: z
    .string({ invalid_type_error: "Descrição da receita deve ser texto" })
    .nullable()
    .optional(),

  valor_receita: z
    .number({ invalid_type_error: "Valor da receita deve ser número" })
    .positive("Valor da receita deve ser positivo")
    .nullable()
    .optional(),

  data_receita: z.coerce
    .date({ invalid_type_error: "Data da receita inválida" })
    .nullable()
    .optional(),

  metodo_pagamento: z
    .enum(["debito", "credito"], {
      errorMap: () => ({ message: "Método de pagamento inválido" })
    })
    .nullable()
    .optional(),

  id_conta: z
    .number({ invalid_type_error: "ID da conta deve ser número" })
    .int("ID da conta deve ser inteiro")
    .nullable()
    .optional(),

  id_cartao: z
    .number({ invalid_type_error: "ID do cartão deve ser número" })
    .int("ID do cartão deve ser inteiro")
    .nullable()
    .optional(),

  id_categoria: z
    .number({ invalid_type_error: "ID da categoria deve ser número" })
    .int("ID da categoria deve ser inteiro")
    .nullable()
    .optional(),

  id_user: z
    .number({ invalid_type_error: "ID do usuário deve ser número" })
    .int("ID do usuário deve ser inteiro")
});

export const receitaValidator = (user, partial = null) => {
  if (partial) {
    return receitasSchema.partial(partial).safeParse(user);
  } else {
    return receitasSchema.safeParse(user);
  }
};

export async function create(receita) {
  return await prisma.receitas.create({
    data: receita,
    select: {
      id: true,
      nome_receita: true,
      desc_receita: true,
      valor_receita: true,
      data_receita: true,
      metodo_pagamento: true,
      id_conta: true,
      id_cartao: true,
      id_categoria: true
    }
  });
}

export async function findAll() {
  return await prisma.receitas.findMany();
}

export async function findById(id) {
  return await prisma.receitas.findUnique({
    where: { id }
  });
}

export async function findReceitasByUserId(userId) {
  return await prisma.receitas.findMany({
    where: { id_user: userId },
    select: {
      id: true,
      nome_receita: true,
      desc_receita: true,
      valor_receita: true,
      data_receita: true,
      id_categoria: true
    },
    orderBy: { data_receita: "desc" }
  });
}

export async function update(id, data) {
  return await prisma.receitas.update({
    where: { id },
    data
  });
}

export async function remove(id) {
  return await prisma.receitas.delete({
    where: { id }
  });
}
