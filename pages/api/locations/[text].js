import { prisma } from "prisma/client.js";

export default async function getLocations(req, res) {
  if (req.method != "GET") {
    res.status(500).end("Invalid HTTP request");
  }
  const { text } = req.query;
  const locations = await prisma.location.findMany({
    where: {
      name: {
        startsWith: text,
      },
    },
  });

  const sortedLocations = locations.sort(
    (a, b) => a.name.length - b.name.length
  );

  if (sortedLocations.length === 0) {
    next(err);
    res.status(404);
    res.render("error", { error: err });
  }

  res.json({ message: sortedLocations });
}
