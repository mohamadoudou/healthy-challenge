import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const getRecords = () => [
  { name: "Nafi", date: "1650931200000", steps: 10000 },
  { name: "Moctar", date: "1850931200000", steps: 15000 },
];

async function seed() {
  await Promise.all(
    getRecords().map((record) => {
      return db.record.create({ data: record });
    })
  );
}

seed();
