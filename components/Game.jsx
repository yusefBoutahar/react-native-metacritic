import { View, Text, Image } from "react-native";

export const Game = ({ game }) => {
  return (
    <View key={game.slug} style={Styles.card}>
      <Image source={{ uri: game.image }} style={Styles.image} />
      <View style={Styles.content}>
        <Text style={Styles.score}>{game.score}</Text>
        <Text style={Styles.title}>{game.title}</Text>
        <Text style={Styles.releaseDate}>{game.releaseDate}</Text>
        <Text style={Styles.description}>{game.description}</Text>
      </View>
    </View>
  );
};

const Styles = {
  card: {
    marginBottom: 50,
  },
  content: {
    marginLeft: 0,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  description: {
    color: "#fff",
  },
  releaseDate: {
    color: "#fff",
  },
  score: {
    fontSize: 30,
    color: "#fff",
  },
};
