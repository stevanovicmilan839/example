// TODO: slider on web
import React, { memo, useState } from "react";
import { FlatList, Image, ImageSourcePropType, View } from "react-native";
import { Button, Card, Screen, Text } from "../../../../components";
import { ColorTheme, changeTheme } from "../../../../models";
import { Theme, useRootDispatch, useRootSelector } from "../../../../utils";
import { useColor, useNav } from "../../../../hooks";
import Slider from "@react-native-community/slider";

interface Card {
  title: string;
  value: string;
  target?: string;
  chart?: ImageSourcePropType;
  button?: string;
}

const image = require("../../../../assets/placeholder.png");
const cards: Card[] = [
  {
    title: "Marketing",
    value: "123.4 M"
  },
  {
    target: "+22% of target",
    title: "Conversion",
    value: "537"
  },
  {
    chart: image,
    target: "+12.3 of target",
    title: "Conversion",
    value: "432.1 M"
  },
  {
    target: "11% of target",
    title: "Sales",
    value: "345.8 M"
  },
  {
    button: "save",
    title: "Users",
    value: "45.5 M"
  },
  {
    target: "+56.6% of target",
    title: "Avg session",
    value: "4:53 H"
  },
  {
    title: "Sessions",
    value: "23.242"
  },
  {
    title: "Bounce rate",
    value: "13%"
  }
];

export default memo(function DarkMode() {
  const dispatch = useRootDispatch();
  const themes = Object.values(ColorTheme);
  const color = useColor();
  const nav = useNav();
  const currentTheme = useRootSelector(state => state.theme.currentColor);
  const themePress = (theme: ColorTheme) => () => dispatch(changeTheme(theme));
  const [elevation, setElevation] = useState(0);
  const handleSlider = (value: number) => setElevation(value);

  return (
    <Screen onLeftPress={nav.to("debug")} title="Dark mode" gutter>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Text title="theme: " />
        <FlatList
          horizontal
          keyExtractor={item => item}
          data={themes}
          renderItem={({ item }) => (
            <Button
              key={item}
              title={item}
              onPress={themePress(item)}
              contained={currentTheme === item}
              secondary={currentTheme !== item}
            />
          )}
        />
      </View>
      <Text title={`elevation: ${elevation}`} />
      <Slider
        minimumTrackTintColor={color.primary}
        value={elevation}
        onValueChange={handleSlider}
        step={1}
        maximumValue={10}
        minimumValue={0}
      />
      <Text title="Weekly Stats" h2 center />
      <FlatList
        numColumns={2}
        extraData={elevation}
        keyExtractor={item => item.title}
        data={cards}
        renderItem={({ item }) => (
          <Card elevation={elevation} onPress={() => undefined} touchable flex>
            <Text title={item.title} overline />
            <Text
              title={item.value}
              h3
              style={{ paddingVertical: Theme.padding.p02 }}
            />
            <Text title={item.target} body2 />
            {item.chart && (
              <Image
                source={item.chart}
                style={{
                  height: 80,
                  marginTop: Theme.padding.p02,
                  resizeMode: "cover",
                  width: "100%"
                }}
              />
            )}
          </Card>
        )}
      />
    </Screen>
  );
});
