import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const contaSchema = z.object({
  nome: z
    .string({ invalid_type_error: "Nome da conta deve ser texto" })
    .max(255, "Máximo de 255 caracteres"),

  saldo: z
    .number({ invalid_type_error: "Saldo deve ser número" })
    .nonnegative("Saldo não pode ser negativo")
    .optional(),

  id_user: z
    .number({ invalid_type_error: "ID do usuário deve ser número" })
    .int("ID do usuário deve ser inteiro")
});

export const contaValidator = (conta, partial = null) => {
  if (partial) {
    return contaSchema.partial(partial).safeParse(conta);
  } else {
    return contaSchema.safeParse(conta);
  }
};

export async function create(conta) {
  return await prisma.conta.create({
    data: conta,
    select: {
      id: true,
      nome: true,
      saldo: true,
      id_user: true
    }
  });
}

export async function findAll() {
  return await prisma.conta.findMany();
}

export async function findById(id) {
  return await prisma.conta.findUnique({
    where: { id }
  });
}

export async function update(id, data) {
  return await prisma.conta.update({
    where: { id },
    data
  });
}

export async function remove(id) {
  return await prisma.conta.delete({
    where: { id }
  });
}
