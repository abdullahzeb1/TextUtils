import React, { useState } from 'react';

export default function TextForm(props) {
  const [text, setText] = useState('');

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert(' Converted to Uppercasr', 'Success');
  };

  const handleLowClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert(' Converted to Lowerercasr', 'Success');
  };

  const handleOnChange = (events) => {
    setText(events.target.value);
  };

  const handlesave = (function () {
    const newtext = document.createElement('a');
    document.body.appendChild(newtext);
    return function (data, fileName, fileHeader) {
      newtext.href = fileHeader + data;
      newtext.download = fileName;
      newtext.click();
      props.showAlert(' Text is Save', 'Success');
    };
  })();

  const handlespeak = () => {
    const newText = new SpeechSynthesisUtterance();
    newText.text = text;
    window.speechSynthesis.speak(newText);
  };

  const handlecopy = () => {
    let newText = document.getElementById('my-box');
    newText.select();
    navigator.clipboard.writeText(newText.value);
    props.showAlert(' Copied to Clipboard', 'Success');
  };

  const handleExteaSpaces = () => {
    let newText = text.split(/[ ]+/);
    props.showAlert(' Extea Spaces Removed', 'Success');
    setText(newText.join(' '));
  };
  return (
    <>
      <div
        className='container'
        style={{
          color: props.mode === 'dark' ? 'white' : 'black',
        }}
      >
        <h1>{props.heading}</h1>
        <div className='mt-3'>
          <textarea
            className='form-control'
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === 'dark' ? '#104066' : 'white',
              color: props.mode === 'dark' ? 'white' : 'black',
            }}
            id='my-box'
            rows='10'
          ></textarea>

          <button className='btn btn-primary mx-1 my-3' onClick={handleUpClick}>
            Convert to Uppercase
          </button>
          <button
            className='btn btn-primary mx-1 my-3'
            onClick={handleLowClick}
          >
            Convert to Lowercase
          </button>

          <button className='btn btn-primary mx-1 my-3' onClick={handlespeak}>
            Speak
          </button>

          <button
            className='btn btn-primary mx-1 my-3'
            onClick={handleExteaSpaces}
          >
            Remove Extea Spaces
          </button>

          <button
            className='btn btn-primary mx-1 my-3'
            onClick={() =>
              handlesave(text, 'fileName.txt', 'data: text/json;charset=utf-8,')
            }
          >
            Click to Save
          </button>

          <button className='btn btn-primary mx-1 my-3' onClick={handlecopy}>
            Copy text
          </button>
        </div>
      </div>

      <div
        className='container my-3'
        style={{
          color: props.mode === 'dark' ? 'white' : 'black',
        }}
      >
        <h2>Your Text Summary</h2>
        <p>
          {text.split(' ').length}Words and {text.length}Characters
        </p>
        <p>{0.008 * text.split(' ').length}Minutes Read </p>
        <h2>Preview</h2>
        <p>
          {text.length > 0
            ? text
            : 'Enter sumthing in the texebox above the preview here '}
        </p>
      </div>
    </>
  );
}
