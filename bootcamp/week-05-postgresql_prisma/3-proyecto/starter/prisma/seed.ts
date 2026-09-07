import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Iniciando seed...');

  await prisma.plant.deleteMany();
  await prisma.category.deleteMany();

  const cactus = await prisma.category.upsert({
    where: { name: 'Cactus' },
    update: {},
    create: { name: 'Cactus' },
  });

  const interior = await prisma.category.upsert({
    where: { name: 'Interior' },
    update: {},
    create: { name: 'Interior' },
  });

  const exterior = await prisma.category.upsert({
    where: { name: 'Exterior' },
    update: {},
    create: { name: 'Exterior' },
  });

  console.log('✅ Categorías creadas:', cactus.name, interior.name, exterior.name);

  const result = await prisma.plant.createMany({
    data: [
      { name: 'Suculenta', species: 'Echeveria elegans', price: 15000, stock: 20, sku: 'PLANT-001', categoryId: cactus.id },
      { name: 'Cactus barril', species: 'Echinocactus grusonii', price: 25000, stock: 15, sku: 'PLANT-002', categoryId: cactus.id },
      { name: 'Potus', species: 'Epipremnum aureum', price: 12000, stock: 30, sku: 'PLANT-003', categoryId: interior.id },
      { name: 'Ficus lyrata', species: 'Ficus lyrata', price: 45000, stock: 8, sku: 'PLANT-004', categoryId: interior.id },
      { name: 'Helecho', species: 'Nephrolepis exaltata', price: 18000, stock: 12, sku: 'PLANT-005', categoryId: exterior.id },
    ],
  });

  console.log(`✅ Seed completo: ${result.count} plantas creadas`);
}

main()
  .catch((err: unknown) => {
    console.error('❌ Error en seed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });