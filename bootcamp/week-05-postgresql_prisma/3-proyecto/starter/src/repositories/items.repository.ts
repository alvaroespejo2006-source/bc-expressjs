import { prisma } from '../lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AppError } from '../errors/AppError';
import { CreatePlantDto, UpdatePlantDto } from '../schemas/items.schema';

export async function findAll(page: number, limit: number) {
  const [plants, total] = await Promise.all([
    prisma.plant.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    }),
    prisma.plant.count(),
  ]);
  return { data: plants, total, page, limit };
}

export async function findById(id: number) {
  return prisma.plant.findUnique({
    where: { id },
    include: { category: true },
  });
}

export async function create(data: CreatePlantDto) {
  try {
    return await prisma.plant.create({ data });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new AppError(409, 'Ya existe una planta con ese SKU');
    }
    throw err;
  }
}

export async function update(id: number, data: UpdatePlantDto) {
  try {
    return await prisma.plant.update({ where: { id }, data });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new AppError(404, 'Planta no encontrada');
    }
    throw err;
  }
}

export async function remove(id: number) {
  try {
    await prisma.plant.delete({ where: { id } });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new AppError(404, 'Planta no encontrada');
    }
    throw err;
  }
}