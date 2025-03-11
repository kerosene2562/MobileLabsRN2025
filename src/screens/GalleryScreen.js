import { View, Image, StyleSheet, FlatList } from "react-native";

const images = [
  require("../assets/noImg.png"),
  require("../assets/noImg.png"),
  require("../assets/noImg.png"),
  require("../assets/noImg.png"),
  require("../assets/noImg.png"),
  require("../assets/noImg.png"),
  require("../assets/noImg.png"),
  require("../assets/noImg.png"),
  require("../assets/noImg.png"),
  require("../assets/noImg.png"),
  require("../assets/noImg.png"),
  require("../assets/noImg.png"),
  require("../assets/noImg.png"),
  require("../assets/noImg.png"),
  require("../assets/noImg.png"),
  require("../assets/noImg.png"),
  require("../assets/noImg.png"),
  require("../assets/noImg.png")
];

export default function GalleryScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item} style={styles.image} />
          </View>
        )}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    width: 150,
    height: 100,
    margin: 10,
    borderRadius: 10,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});