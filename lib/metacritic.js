export async function getLatestGames() {
  const LATEST_GAMES =
    "https://internal-prod.apigee.fandom.net/v1/xapi/finder/metacritic/web?sortBy=-metaScore&productType=games&page=1&releaseYearMin=1958&releaseYearMax=2024&offset=0&limit=24&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u";

  const rawData = await fetch(LATEST_GAMES);

  if (!rawData.ok) {
    throw new Error(`Failed to fetch latest games: ${rawData.status}`);
  }

  const json = await rawData.json();

  const items = json?.data?.items;
  if (!Array.isArray(items)) {
    throw new Error("Invalid API response: missing data.items");
  }

  return items.map((item) => {
    const { description, slug, releaseDate, image, criticScoreSummary, title } =
      item;
    const score = criticScoreSummary?.score ?? null;

    const bucketType = image?.bucketType ?? "";
    const bucketPath = image?.bucketPath ?? "";
    const img = bucketType && bucketPath
      ? `https://www.metacritic.com/a/img/${bucketType}${bucketPath}`
      : null;

    return {
      description: description ?? "",
      releaseDate,
      score,
      slug,
      title,
      image: img,
    };
  });
}

export async function getGameDetails(slug) {
  const GAME_DETAILS = `https://internal-prod.apigee.fandom.net/v1/xapi/composer/metacritic/pages/games/${slug}/web?&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u`;

  const rawData = await fetch(GAME_DETAILS);

  if (!rawData.ok) {
    throw new Error(`Failed to fetch game details: ${rawData.status}`);
  }

  const json = await rawData.json();

  const components = json?.components;
  if (!Array.isArray(components) || !components[0]?.data?.item) {
    throw new Error("Invalid API response: missing components data");
  }

  const { title, description, criticScoreSummary, images } =
    components[0].data.item;
  const score = criticScoreSummary?.score ?? null;

  let img = null;
  if (Array.isArray(images)) {
    const cardImage = images.find((image) => image.typeName === "cardImage");
    if (cardImage?.bucketType && cardImage?.bucketPath) {
      img = `https://www.metacritic.com/a/img/${cardImage.bucketType}${cardImage.bucketPath}`;
    }
  }

  const rawReviews = components[3]?.data?.items;
  const reviews = Array.isArray(rawReviews)
    ? rawReviews.map((review) => {
        const { quote, score, date, publicationName, author } = review;
        return { quote, score, date, publicationName, author };
      })
    : [];

  return {
    img,
    title,
    slug,
    description: description ?? "",
    score,
    reviews,
  };
}
