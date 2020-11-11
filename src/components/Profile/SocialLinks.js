import React, { useRef, useState } from 'react';
import {BiLink} from 'react-icons/bi'

export default function SocialLinks() {

  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess('Copied!');
  };

  return (
    <>
    {/* <div>
      <button onClick={copyToClipboard}>Copy</button> 
      {copySuccess}
    </div> */}

    <form>
    <p
      ref={textAreaRef}
      value='Some text to copy'
    />
    </form>
        <div id="social">
            <a class="facebookBtn smGlobalBtn" href="#" ></a>
		      	<a class="twitterBtn smGlobalBtn" href="#" ></a>
		</div>
    </>
  );
}