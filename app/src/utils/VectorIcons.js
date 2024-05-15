import { View } from "react-native";
import React from "react";
import {
  Ionicons,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
  AntDesign,
  EvilIcons,
  Octicons,
  Fontisto,
  Entypo
} from "@expo/vector-icons";

const VectorIcon = (props) => {
  const { name, size, color, type, onPress, style } = props;
  return (
    <View style={style}>
      {type === "MaterialCommunityIcons" ? (
        <MaterialCommunityIcons
          onPress={onPress}
          name={name}
          size={size}
          color={color}
        />
      ) : type === "FontAwesome" ? (
        <FontAwesome onPress={onPress} name={name} size={size} color={color} />
      ) : type === "FontAwesome5" ? (
        <FontAwesome5 onPress={onPress} name={name} size={size} color={color} />
      ) : type === "Feather" ? (
        <Feather onPress={onPress} name={name} size={size} color={color} />
      ) : type === "AntDesign" ? (
        <AntDesign onPress={onPress} name={name} size={size} color={color} />
      ) : type === "Entypo" ? (
        <Entypo onPress={onPress} name={name} size={size} color={color} />
      ) : type === "Ionicons" ? (
        <Ionicons onPress={onPress} name={name} size={size} color={color} />
      ) : type === "EvilIcons" ? (
        <EvilIcons onPress={onPress} name={name} size={size} color={color} />
      ) : type === "Octicons" ? (
        <Octicons onPress={onPress} name={name} size={size} color={color} />
      ) : type === "Fontisto" ? (
        <Fontisto onPress={onPress} name={name} size={size} color={color} />
      ) : (
        <MaterialIcons
          onPress={onPress}
          name={name}
          size={size}
          color={color}
        />
      )}
    </View>
  );
};

export default VectorIcon;
