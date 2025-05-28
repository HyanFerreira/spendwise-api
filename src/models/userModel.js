// userModel.js
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userSchema = z.object({
  nome: z
    .string({ invalid_type_error: "Nome deve ser texto" })
    .min(1, "Nome é obrigatório")
    .max(255, "Nome deve ter no máximo 255 caracteres"),

  email: z
    .string({ invalid_type_error: "Email deve ser texto" })
    .email("Email inválido")
    .max(255, "Email deve ter no máximo 255 caracteres"),

  senha: z
    .string({ invalid_type_error: "Senha deve ser texto" })
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .max(500, "Senha deve ter no máximo 500 caracteres"),

  img_perfil: z
    .instanceof(Buffer, { message: "Imagem deve ser um buffer" })
    .optional()
    .nullable()
});

export const userValidator = (user, partial = null) => {
  if (partial) {
    return userSchema.partial(partial).safeParse(user);
  } else {
    return userSchema.safeParse(user);
  }
};

export async function create(user) {
  return await prisma.users.create({
    data: user,
    select: {
      id: true,
      nome: true,
      email: true,
      senha: true,
      img_perfil: true
    }
  });
}

export async function findAll() {
  return await prisma.users.findMany({
    select: {
      id: true,
      nome: true,
      email: true,
      img_perfil: true
    }
  });
}

export async function findById(id) {
  return await prisma.users.findUnique({
    where: { id },
    select: {
      id: true,
      nome: true,
      email: true,
      img_perfil: true
    }
  });
}

export async function update(id, data) {
  return await prisma.users.update({
    where: { id },
    data,
    select: {
      id: true,
      nome: true,
      email: true,
      img_perfil: true
    }
  });
}

export async function remove(id) {
  return await prisma.users.delete({
    where: { id }
  });
}
