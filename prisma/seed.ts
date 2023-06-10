import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

// const getRecords = () => [
//   { name: "Nafi", date: "1650931200000", points: 10000 },
//   { name: "Moctar", date: "1850931200000", points: 15000 },
// ];

const getUsers = () => [
  {
    name: "Moctar",
    username: "moctar",
  },
  {
    name: "Mohamadou",
    username: "mohamadou",
  },
];

const getChallenges = () => [
  {
    name: "Step count",
    description: "Least Steps get punish",
    startDate: "1650931200000",
    endDate: "1950931200000",
  },
  {
    name: "Swimming",
    description: "Swim 100m a day for a week",
    startDate: "1650931200000",
    endDate: "1950931200000",
  },
];

// const getChallengeOnUser = () => [
//   {
//     userId: "",
//     challengeId: "",
//   },
// ];

async function seed() {
  // await Promise.all(
  //   getRecords().map((record) => {
  //     return db.record.create({ data: record });
  //   })
  // );
  await Promise.all(
    getUsers().map((user) => {
      return db.user.create({ data: user });
    })
  );
  await Promise.all(
    getChallenges().map((challenge) => {
      return db.challenge.create({ data: challenge });
    })
  );
}

seed();
