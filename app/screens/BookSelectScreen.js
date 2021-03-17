import React from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { Tile, Card, Text, Icon, Button, Input } from "react-native-elements";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Ikigai: The Japanese secret to a long and happy life",
    image: require("../assets/product_images/ikigai.jpg"),
    content:
      "The people of Japan believe that everyone has an ikigai – a reason to jump out of bed each morning. And according to the residents of the Japanese island of Okinawa – the world’s longest-living people – finding it is the key to a longer and more fulfilled life. Inspiring and comforting, this book will give you the life-changing tools to uncover your personal ikigai. It will show you how to leave urgency behind, find your purpose, nurture friendships and throw yourself into your passions.",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Sapiens",
    image: require("../assets/product_images/sapiens.jpg"),
    content:
      "100,000 years ago, at least six human species inhabited the earth. Today there is just one. Us. Homo sapiens. How did our species succeed in the battle for dominance? Why did our foraging ancestors come together to create cities and kingdoms? How did we come to believe in gods, nations and human rights; to trust money, books and laws; and to be enslaved by bureaucracy, timetables and consumerism? And what will our world be like in the millennia to come",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Think and Grow Rich",
    image: require("../assets/product_images/tagr.jpg"),
    content:
      "Think and Grow Rich was written by Napoleon Hill in 1937 and promoted as a personal development and self-improvement book. He claimed to be inspired by a suggestion from business magnate and later-philanthropist Andrew Carnegie.",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bc",
    title: "The India Way",
    image: require("../assets/product_images/theindiaway.jpg"),
    content:
      "For India, this means optimal relationships with all the major powers to best advance its goals. It also requires a bolder and non-reciprocal approach to its neighbourhood. A global footprint is now in the making that leverages India’s greater capability and relevance, as well as its unique diaspora. This era of global upheaval entails greater expectations from India, putting it on the path to becoming a leading power. In The India Way, S. Jaishankar, India’s Minister of External Affairs, analyses these challenges and spells out possible policy responses. He places this thinking in the context of history and tradition, appropriate for a civilizational power that seeks to reclaim its place on the world stage. ",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97w63",
    title: "Da Vinci Code",
    image: require("../assets/product_images/daVinci.jpg"),
    content:
      "While in Paris, Harvard symbologist Robert Langdon is awakened by a phone call in the dead of the night. The elderly curator of the Louvre has been murdered inside the museum, his body covered in baffling symbols. As Langdon and gifted French cryptologist Sophie Neveu sort through the bizarre riddles, they are stunned to discover a trail of clues hidden in the works of Leonardo da Vinci—clues visible for all to see and yet ingeniously disguised by the painter.",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145971e29d72",
    title: "Wings of Fire",
    image: require("../assets/product_images/wings.jpg"),
    content:
      "Wings of Fire is an autography of APJ Abdul Kalam covering his early life and his work in Indian space research and missile programs. It is the story of a boy from a humble background who went on to become a key player in Indian space research/Indian missile programs and later became the president of India. The book covers his life before he became the President of India and commanded the armed forces, his schooling and formative years, what led to his interest in space and research as well as his biggest influences in life. The chapters at the start that deal with his life before and just after Independence paint a fascinating picture of life during such tumultuous times while our nation as we know it was being born. ",
  },
];

function findArrayElementByTitle(array, title) {
  return array.find((element) => {
    return element.title === title;
  });
}

function BookSelectScreen({ props, route }) {
  const { itemId, title } = route.params;
  const item = findArrayElementByTitle(DATA, title);

  return (
    <SafeAreaView>
      <Card>
        <Card.Title>{item.title}</Card.Title>
        <Card.Divider />
        <Card.Image source={item.image} resizeMode={"contain"}></Card.Image>
        <Card.Divider />
        <Text style={{ marginBottom: 10 }}>{item.content}</Text>
        <Card.Divider />
        <View style={{ flexDirection: "row" }}>
          <Text h4>Qty. </Text>
          <Button icon={<Icon name="add" size={20} color="white" />} />
          <Button icon={<Icon name="remove" size={20} color="white" />} />
          <Button title="Add to cart" size={20} />
        </View>
      </Card>
    </SafeAreaView>
  );
}

export default BookSelectScreen;
