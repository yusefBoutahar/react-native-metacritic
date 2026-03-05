import { getLatestGames, getGameDetails } from "../../lib/metacritic";

global.fetch = jest.fn();

const mockLatestGamesResponse = {
  data: {
    items: [
      {
        title: "Test Game",
        slug: "test-game",
        description: "A test game description",
        releaseDate: "2024-01-01",
        criticScoreSummary: { score: 85 },
        image: { bucketType: "catalog", bucketPath: "/test.jpg" },
      },
      {
        title: "Another Game",
        slug: "another-game",
        description: "Another description",
        releaseDate: "2024-02-01",
        criticScoreSummary: { score: 92 },
        image: { bucketType: "catalog", bucketPath: "/another.jpg" },
      },
    ],
  },
};

const mockGameDetailsResponse = {
  components: [
    {
      data: {
        item: {
          title: "Test Game",
          description: "Full description of the test game",
          criticScoreSummary: { score: 85 },
          images: [
            { typeName: "cardImage", bucketType: "catalog", bucketPath: "/card.jpg" },
            { typeName: "heroImage", bucketType: "catalog", bucketPath: "/hero.jpg" },
          ],
        },
      },
    },
    { data: {} },
    { data: {} },
    {
      data: {
        items: [
          {
            quote: "Great game!",
            score: 90,
            date: "2024-01-15",
            publicationName: "GameReview",
            author: "John Doe",
          },
        ],
      },
    },
  ],
};

beforeEach(() => {
  fetch.mockClear();
});

describe("getLatestGames", () => {
  it("correctly maps the raw API response", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockLatestGamesResponse),
    });

    const games = await getLatestGames();

    expect(games).toHaveLength(2);
    expect(games[0]).toEqual({
      title: "Test Game",
      slug: "test-game",
      description: "A test game description",
      releaseDate: "2024-01-01",
      score: 85,
      image: "https://www.metacritic.com/a/img/catalog/test.jpg",
    });
  });

  it("constructs image URL from bucketType and bucketPath", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockLatestGamesResponse),
    });

    const games = await getLatestGames();
    expect(games[0].image).toBe("https://www.metacritic.com/a/img/catalog/test.jpg");
    expect(games[1].image).toBe("https://www.metacritic.com/a/img/catalog/another.jpg");
  });

  it("throws error when fetch fails", async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 500 });
    await expect(getLatestGames()).rejects.toThrow("Failed to fetch latest games: 500");
  });

  it("throws error when response has no data.items", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: {} }),
    });
    await expect(getLatestGames()).rejects.toThrow("Invalid API response: missing data.items");
  });

  it("handles missing criticScoreSummary gracefully", async () => {
    const response = {
      data: {
        items: [
          {
            title: "No Score Game",
            slug: "no-score",
            description: "desc",
            releaseDate: "2024-01-01",
            image: { bucketType: "catalog", bucketPath: "/img.jpg" },
          },
        ],
      },
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(response),
    });

    const games = await getLatestGames();
    expect(games[0].score).toBeNull();
  });

  it("handles missing image fields gracefully", async () => {
    const response = {
      data: {
        items: [
          {
            title: "No Image Game",
            slug: "no-image",
            description: "desc",
            releaseDate: "2024-01-01",
            criticScoreSummary: { score: 80 },
            image: {},
          },
        ],
      },
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(response),
    });

    const games = await getLatestGames();
    expect(games[0].image).toBeNull();
  });

  it("handles empty items array", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: { items: [] } }),
    });

    const games = await getLatestGames();
    expect(games).toEqual([]);
  });

  it("handles missing description by defaulting to empty string", async () => {
    const response = {
      data: {
        items: [
          {
            title: "No Desc",
            slug: "no-desc",
            releaseDate: "2024-01-01",
            criticScoreSummary: { score: 70 },
            image: { bucketType: "catalog", bucketPath: "/img.jpg" },
          },
        ],
      },
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(response),
    });

    const games = await getLatestGames();
    expect(games[0].description).toBe("");
  });
});

describe("getGameDetails", () => {
  it("correctly extracts game details from components", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockGameDetailsResponse),
    });

    const game = await getGameDetails("test-game");

    expect(game).toEqual({
      title: "Test Game",
      slug: "test-game",
      description: "Full description of the test game",
      score: 85,
      img: "https://www.metacritic.com/a/img/catalog/card.jpg",
      reviews: [
        {
          quote: "Great game!",
          score: 90,
          date: "2024-01-15",
          publicationName: "GameReview",
          author: "John Doe",
        },
      ],
    });
  });

  it("finds the cardImage from the images array", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockGameDetailsResponse),
    });

    const game = await getGameDetails("test-game");
    expect(game.img).toBe("https://www.metacritic.com/a/img/catalog/card.jpg");
  });

  it("throws error when fetch fails", async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 404 });
    await expect(getGameDetails("unknown")).rejects.toThrow("Failed to fetch game details: 404");
  });

  it("throws error when components data is missing", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });
    await expect(getGameDetails("test")).rejects.toThrow("Invalid API response: missing components data");
  });

  it("handles missing images array gracefully", async () => {
    const response = {
      components: [
        {
          data: {
            item: {
              title: "No Images",
              description: "desc",
              criticScoreSummary: { score: 80 },
            },
          },
        },
        { data: {} },
        { data: {} },
        { data: { items: [] } },
      ],
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(response),
    });

    const game = await getGameDetails("no-images");
    expect(game.img).toBeNull();
  });

  it("handles empty reviews array", async () => {
    const response = {
      ...mockGameDetailsResponse,
      components: [
        mockGameDetailsResponse.components[0],
        { data: {} },
        { data: {} },
        { data: { items: [] } },
      ],
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(response),
    });

    const game = await getGameDetails("test");
    expect(game.reviews).toEqual([]);
  });

  it("handles missing reviews component gracefully", async () => {
    const response = {
      components: [
        mockGameDetailsResponse.components[0],
        { data: {} },
        { data: {} },
      ],
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(response),
    });

    const game = await getGameDetails("test");
    expect(game.reviews).toEqual([]);
  });
});
