import 'styled-components/macro';
import 'emoji-mart/css/emoji-mart.css';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'emoji-mart';

import Button from '../../components/atoms/button';
import Input from '../../components/atoms/input';
import { marginLeft /*, marginRight*/ } from '../../css.stylesheet';

import { ComposeMessageForm } from './styled.components';

const propTypes = {
  disabled: PropTypes.bool,
  onSendMessage: PropTypes.func.isRequired,
};

function ComposeMessage({ disabled, onSendMessage }) {
  const [message, setMessage] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);

  const onSubmit = event => {
    event.preventDefault();

    if (!disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <ComposeMessageForm onSubmit={onSubmit}>
      {/* <Button
        icon="gif"
        title="Choose a gif"
        css={marginRight}
        disabled={disabled}
      />

      <Button
        icon="sticky_note_2"
        title="Choose a sticker"
        css={marginRight}
        disabled={disabled}
      />

      <Button
        icon="photo"
        title="Add files"
        css={marginRight}
        disabled={disabled}
      /> */}

      {showEmojis ? (
        <Picker
          style={{
            position: 'absolute',
            bottom: '50px',
            right: '20px',
            backgroundColor: '#fff',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.7)',
          }}
          onSelect={emoji => console.log(emoji)}
        />
      ) : null}

      <Input
        title="Message to send"
        value={message}
        placeholder="Type a message..."
        onChange={e => setMessage(e.target.value)}
        rounded
        required
        endAdornment={
          <Button
            icon="emoji_emotions"
            title="Choose an emoji"
            iconSize={24}
            iconButton
            disabled={disabled}
            onClick={() => setShowEmojis(!showEmojis)}
          />
        }
      />

      {message ? (
        <Button
          type="submit"
          icon="send"
          title="Send message"
          iconButton
          iconSize={24}
          css={marginLeft}
          disabled={disabled}
        />
      ) : (
        <Button
          icon="thumb_up"
          title="Send a like"
          iconButton
          iconSize={24}
          css={marginLeft}
          disabled={disabled}
        />
      )}
    </ComposeMessageForm>
  );
}

ComposeMessage.propTypes = propTypes;
ComposeMessage.defaultPropsTypes = { disabled: false };
export default ComposeMessage;
