import React, { forwardRef } from 'react';

import { InputRoot, FormControl, Adornment } from './styled.components';

function Input({ startAdornment, endAdornment, helpText, ...otherProps }, ref) {
  return (
    <>
      <InputRoot>
        {startAdornment ? (
          <Adornment position="start">{startAdornment}</Adornment>
        ) : null}

        <FormControl
          ref={ref}
          {...otherProps}
          startAdornment={startAdornment !== undefined}
          endAdornment={endAdornment !== undefined}
          aria-label={otherProps.title}
        />

        {endAdornment ? (
          <Adornment position="end">{endAdornment}</Adornment>
        ) : null}
      </InputRoot>
      {helpText ? (
        <small style={{ color: '#ccc', textTransform: 'initial' }}>
          {helpText}
        </small>
      ) : null}
    </>
  );
}

export default forwardRef(Input);
