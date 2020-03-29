import React, {memo, useCallback} from 'react';
import {View, Keyboard} from 'react-native';
import {TextInput, Icon} from '../../../../components';
import {useRootDispatch, useRootSelector, Theme} from '../../../../utils';
import 'react-native-get-random-values';
import {v4} from 'uuid';
import {Message, typeChatMessage, createChatMessage} from './Messages';

export const TextField = memo(function ChatTextField() {
  const dispatch = useRootDispatch();
  const textField = useRootSelector((state) => state.chatMessage.textField);
  const onMessageChange = useCallback(
    (message: string) => dispatch(typeChatMessage(message)),
    [dispatch],
  );

  const onSubmit = useCallback(() => {
    if (textField.trim().length === 0) {
      return;
    }
    const date = Date.now();
    const message: Message = {
      active: true,
      createdAt: date,
      userId: 'User bob',
      id: v4(),
      message: textField.trim(),
      updatedAt: date,
      conversationId: '1',
    };
    Keyboard.dismiss();
    dispatch(createChatMessage(message));
  }, [dispatch, textField]);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TextInput
        value={textField}
        onChangeText={onMessageChange}
        onSubmitEditing={onSubmit}
        flex
      />
      <Icon
        name="send"
        onPress={onSubmit}
        style={{paddingLeft: Theme.padding.p02}}
      />
    </View>
  );
});
