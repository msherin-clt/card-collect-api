import bcrypt from "bcrypt";
import prisma from "../src/config/db.js";

async function main() {
  // Clear tables in proper order
  await prisma.deckCard.deleteMany();
  await prisma.userCardWishlist.deleteMany();
  await prisma.userCardCollection.deleteMany();
  await prisma.deck.deleteMany();
  await prisma.card.deleteMany();
  await prisma.set.deleteMany();
  await prisma.series.deleteMany();
  await prisma.user.deleteMany();

  // --- Users ---
  const usersData = [
    {
      email: "alice@test.com",
      username: "alice",
      password: await bcrypt.hash("alice1234", 10),
    },
    {
      email: "bob@example.com",
      username: "bob",
      password: await bcrypt.hash("bob1234", 10),
    },
    {
      email: "charlie@demo.com",
      username: "charlie",
      password: await bcrypt.hash("charlie1234", 10),
      role: "ADMIN",
    },
  ];

  const users = await Promise.all(
    usersData.map((u) => prisma.user.create({ data: u }))
  );

  // --- Series, Sets, Cards ---
  const pokemonSeries = await prisma.series.create({
    data: {
      name: "Pokémon",
      publisher: "Nintendo",
      sets: {
        create: [
          {
            name: "Base Set",
            cards: {
              create: [
                { name: "Pikachu", number: "25", image_url: null },
                { name: "Charizard", number: "4", image_url: null },
                { name: "Bulbasaur", number: "1", image_url: null },
              ],
            },
          },
          {
            name: "Jungle",
            cards: {
              create: [
                { name: "Eevee", number: "51", image_url: null },
                { name: "Snorlax", number: "11", image_url: null },
              ],
            },
          },
        ],
      },
    },
    include: {
      sets: { include: { cards: true } },
    },
  });

  const allCards = pokemonSeries.sets.flatMap((s) => s.cards);

  // --- Assign collections, wishlists, decks ---
  for (const user of users) {
    // Collection: give each user 2 cards
    await prisma.userCardCollection.createMany({
      data: allCards.slice(0, 2).map((card) => ({
        userId: user.id,
        cardId: card.id,
        condition: "Mint",
      })),
    });

    // Wishlist: give each user 1 different card
    await prisma.userCardWishlist.create({
      data: {
        userId: user.id,
        cardId: allCards[2].id,
      },
    });

    // Deck
    const deck = await prisma.deck.create({
      data: {
        name: `${user.username}'s Starter Deck`,
        format: "Casual",
        description: "A simple starter deck.",
        userId: user.id,
      },
    });

    // Deck cards
    await prisma.deckCard.createMany({
      data: [
        {
          deckId: deck.id,
          cardId: allCards[0].id,
          quantity: 2,
        },
        {
          deckId: deck.id,
          cardId: allCards[1].id,
          quantity: 1,
        },
      ],
    });
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
