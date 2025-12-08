// wishlist_screen.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";

const items = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    price: "$1399.99",
    rating: 5,
    shipping: "Free shipping",
    image: require("./assets/iphone15.jpg"),
  },
  {
    id: "2",
    name: "iPhone 14 Pro Max",
    price: "$1699.99",
    rating: 5,
    shipping: "Free shipping",
    image: require("./assets/iphone14.jpg"),
  },
];

export default function WishlistScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Product Image with heart icon */}
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
        <TouchableOpacity style={styles.heartIcon}>
          <AntDesign name="hearto" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Product Info */}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.shipping}>
          🚚 <Text style={styles.shippingText}>{item.shipping}</Text>
        </Text>
        <View style={styles.rating}>
          {Array.from({ length: 5 }).map((_, index) => (
            <MaterialIcons
              key={index}
              name={index < item.rating ? "star" : "star-border"}
              size={18}
              color="#FFB800"
            />
          ))}
        </View>
      </View>

      {/* Badge on the right */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>O.N.E</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <Text style={styles.headerTitle}>Wishlist</Text>
        <View style={styles.rightSide}>
          <TouchableOpacity style={{ marginRight: 12 }}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("./assets/profilelogoforhome.png")} // ✅ updated profile logo
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Items */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 40, // ⬅️ extra spacing at the top
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 18,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    padding: 10,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: "cover",
  },
  heartIcon: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 50,
    padding: 4,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#26A69A",
    marginVertical: 2,
  },
  shipping: {
    fontSize: 13,
    color: "#FF9800",
    marginVertical: 2,
  },
  shippingText: {
    color: "#FF9800",
    fontWeight: "500",
  },
  rating: {
    flexDirection: "row",
    marginTop: 4,
  },
  badge: {
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
