import { prisma } from "@prisma/lib/client.js";

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
    return res
      .status(404)
      .json({ error: "A location with this text does not exist" });
  } else {
    res.json({ message: sortedLocations });
  }
}
