import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const despesasSchema = z.object({
  nome_despesa: z
    .string({ invalid_type_error: "Nome da despesa deve ser texto" })
    .max(255, "Máximo de 255 caracteres")
    .nullable()
    .optional(),

  desc_despesa: z
    .string({ invalid_type_error: "Descrição da despesa deve ser texto" })
    .nullable()
    .optional(),

  valor_despesa: z
    .number({ invalid_type_error: "Valor da despesa deve ser número" })
    .positive("Valor da despesa deve ser positivo")
    .nullable()
    .optional(),

  data_despesa: z.coerce
    .date({ invalid_type_error: "Data da despesa inválida" })
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

export const despesaValidator = (user, partial = false) => {
  if (partial) {
    return despesasSchema.partial().safeParse(user);
  } else {
    return despesasSchema.safeParse(user);
  }
};

export async function findDespesasByUserId(userId) {
  return await prisma.despesas.findMany({
    where: { id_user: userId },
    select: {
      id: true,
      nome_despesa: true,
      desc_despesa: true,
      valor_despesa: true,
      data_despesa: true,
      id_categoria: true
    },
    orderBy: { data_despesa: "desc" }
  });
}

export async function create(despesa) {
  return await prisma.despesas.create({
    data: despesa,
    select: {
      id: true,
      nome_despesa: true,
      desc_despesa: true,
      valor_despesa: true,
      data_despesa: true,
      metodo_pagamento: true,
      id_conta: true,
      id_cartao: true,
      id_categoria: true,
      id_user: true
    }
  });
}

export async function findAll() {
  return await prisma.despesas.findMany();
}

export async function findById(id) {
  return await prisma.despesas.findUnique({
    where: { id }
  });
}

export async function update(id, data) {
  return await prisma.despesas.update({
    where: { id },
    data
  });
}

export async function remove(id) {
  return await prisma.despesas.delete({
    where: { id }
  });
}
