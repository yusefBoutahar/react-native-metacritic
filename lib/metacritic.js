export async function getLatestGames() {
  const PROXY_URL = "http://localhost:3000/api/latest-games";

  const rawData = await fetch(PROXY_URL);
  const json = await rawData.json();

  const {
    data: { items },
  } = json;

  return items.map((item) => {
    const { description, slug, releaseDate, image, criticScoreSummary, title } =
      item;
    const { score } = criticScoreSummary;

    // crea la imagen
    const { bucketType, bucketPath } = image;
    const img = `https://www.metacritic.com/a/img/${bucketType}${bucketPath}`;

    return {
      description,
      releaseDate,
      score,
      slug,
      title,
      image: img,
    };
  });
}

export async function getGameDetails(slug) {
  const PROXY_URL = `http://localhost:3000/api/game-details/${slug}`;

  const rawData = await fetch(PROXY_URL);
  const json = await rawData.json();

  const { components } = json;
  const { title, description, criticScoreSummary, images } = components[0];
  const { score } = criticScoreSummary;

  // get the card image
  const cardImage = images.find((image) => image.typeName === "cardImage");
  const { bucketType, bucketPath } = cardImage;
  const img = `https://www.metacritic.com/a/img/${bucketType}${bucketPath}`;

  const rawReviews = components[3].data.items;

  // get the reviews
  const reviews = rawReviews.map((review) => {
    const { quote, score, date, publicationName, author } = review;
    return { quote, score, date, publicationName, author };
  });

  return {
    title,
    description,
    score,
    image: img,
    reviews,
  };
}
