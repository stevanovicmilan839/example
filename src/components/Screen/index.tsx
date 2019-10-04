import React, { memo } from "react";
import { SafeAreaView, StatusBar, StyleSheet, ViewStyle } from "react-native";
import { getCurrentColor } from "../../models";
import { Theme, useRootSelector } from "../../utils";
import { NavBar } from "./NavBar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface OwnProps {
  style?: ViewStyle;
  title?: string;
  border?: boolean;
  gutter?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  disableScroll?: boolean;
  onLeftPress?(): void;
  onRightPress?(): void;
}

type Props = OwnProps;

export const Screen: React.FC<Props> = memo(function Screen({
  title,
  style,
  gutter,
  border,
  onLeftPress,
  onRightPress,
  children,
  disableScroll,
  leftIcon,
  rightIcon
}) {
  const colors = useRootSelector(state => getCurrentColor(state));
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1
    },
    children: {
      flex: 1,
      padding: gutter ? Theme.padding.p04 : Theme.padding.p00
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={colors.statusBar} />
      <NavBar
        border={border}
        title={title}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        onLeftPress={onLeftPress}
        onRightPress={onRightPress}
      />
      {disableScroll ? 
        children
       : 
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.container, style]}
        >
          {children}
        </KeyboardAwareScrollView>
      }
    </SafeAreaView>
  );
});
