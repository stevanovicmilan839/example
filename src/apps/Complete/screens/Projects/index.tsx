import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {LayoutChangeEvent, View} from 'react-native';
import {KeyboardHandler, Screen} from '../../../../components';
import {useColor} from '../../../../hooks';
import {config, useRootSelector} from '../../../../utils';
import {List} from '../../components';
import {completeConfig} from '../../utils';

// TODO: add journal
// TODO: add historical data
// TODO: add purpose
// TODO: add goals

// TODO: render as <Board />

export const Projects = memo(function Projects() {
  const color = useColor();
  const {navigate} = useNavigation();
  const [dimensions, setDimensions] = useState(0);
  const keyboardHeight = useRootSelector((s) => s.device.keyboardHeight);
  const itemId = useRootSelector(
    (s) =>
      s.completeUser?.items.filter(
        (id) => s.completeItem.items[id].title === 'Projects',
      )[0],
  );
  if (!itemId) throw new Error('missing item id');

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const {height} = event.nativeEvent.layout;
      if (dimensions > 0) return;

      setDimensions(height);
    },
    [dimensions],
  );

  const keyboardPadding =
    keyboardHeight > 0 ? config.padding(32) : config.padding(51);
  const maxHeight = dimensions - keyboardHeight - keyboardPadding;

  const navToAccount = useCallback(() => navigate('account'), [navigate]);

  return (
    <Screen onRightPress={navToAccount} rightIcon="account" title="Implement">
      <KeyboardHandler backgroundColor={color.surface} onLayout={onLayout}>
        <View style={{padding: completeConfig.padding, maxHeight}}>
          <List
            itemId={itemId}
            key={itemId}
            parentItemId={null}
            placeholder="Item title..."
            title="Add item"
          />
        </View>
      </KeyboardHandler>
    </Screen>
  );
});
