import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'bson';

const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      { id: new ObjectId().toString(), name: 'Petição inicial' },
      { id: new ObjectId().toString(), name: 'Contestação' },
      { id: new ObjectId().toString(), name: 'Impugnação' },
      { id: new ObjectId().toString(), name: 'Apelação' },
      { id: new ObjectId().toString(), name: 'Contrarrazão' },
      { id: new ObjectId().toString(), name: 'Alvará judicial' },
      {
        id: new ObjectId().toString(),
        name: 'Certidão de trânsito em julgado',
      },
      { id: new ObjectId().toString(), name: 'Manifestação' },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
