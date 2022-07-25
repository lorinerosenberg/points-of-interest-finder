const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const csvParser = require("csv-parser");

const filePath = "./data/GB.tsv";
const prisma = new PrismaClient();

async function main() {
  const results = [];

  fs.createReadStream(filePath, "utf8")
    .pipe(csvParser({ separator: "\t" }))
    .on("data", async (row) => {
      await prisma.location.create({
        data: {
          name: row["name"],
        },
      });
      results.push(row["name"]);
    })
    .on("end", () => {
      console.log("Done seeding DB");
    });
}

main().finally(async () => {
  await prisma.$disconnect();
});
