import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

const CapturedImagePreview = ({ image, retakeImage }) => {
  return (
    <View
      style={{
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <ImageBackground
        source={{ uri: image && image.uri }}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <TouchableOpacity
            onPress={retakeImage}
            style={{
              width: 130,
              height: 40,
              backgroundColor: "#9b59b6",
              alignItems: "center",
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                lineHeight: 40,
              }}
            >
              Re-take
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CapturedImagePreview;
