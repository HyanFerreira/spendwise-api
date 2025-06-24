import { z } from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const categoriasSchema = z.object({
  nome_categoria: z
    .string({ invalid_type_error: "Nome da despesa deve ser texto" })
    .max(255, "Máximo de 255 caracteres"),

  icone_categoria: z
    .string({ invalid_type_error: "Link do ícone da categoria deve ser texto" })
    .max(500, "Máximo de 500 caracteres")
    .nullable()
    .optional(),

  id_user: z
    .number({ invalid_type_error: "ID da conta deve ser número" })
    .nonnegative()
    .int("ID do usuário dever ser inteiro")
});

export const categoriaValidator = (user, partial = null) => {
  if (partial) {
    return categoriasSchema.partial(partial).safeParse(user);
  } else {
    return categoriasSchema.safeParse(user);
  }
};

export async function create(categoria) {
  return await prisma.categorias.create({
    data: categoria,
    select: {
      nome_categoria: true,
      icone_categoria: true,
      id_user: true
    }
  });
}

export async function findAll() {
  return await prisma.categorias.findMany();
}

export async function findById(id) {
  return await prisma.categorias.findUnique({
    where: { id }
  });
}

export async function findByUserId(userId) {
  return await prisma.categorias.findMany({
    where: { id_user: userId }
  });
}

export async function update(id, data) {
  return await prisma.categorias.update({
    where: { id },
    data
  });
}

export async function remove(id) {
  return await prisma.categorias.delete({
    where: { id }
  });
}
