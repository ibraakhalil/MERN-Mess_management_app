import React from 'react'
import './css/NoticeBoard.css'


function NoticeBoard() {
  return (
    <div className='notice_board'>
      <h3>Recent Notice</h3>
      <div className="notice">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis sagittis orci quis ornare. Quisque placerat mollis nisi non sodales. Aliquam et finibus metus. Donec in ornare mi. Nunc bibendum porta rhoncus. Proin laoreet congue diam, eu ultrices sem varius ac. Phasellus volutpat mollis nisi, in scelerisque nunc tempus a. Nunc eget erat iaculis, faucibus purus at, tincidunt nunc. Curabitur non fringilla diam. Quisque velit risus, dapibus eu mollis eget, hendrerit eu orci. Donec sit amet risus ac felis dictum mattis ac id turpis. Nunc laoreet et augue id condimentum. Sed dolor ante, malesuada id nunc vitae, sagittis pharetra dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et rutrum purus. Morbi rhoncus, risus ut interdum elementum, mi augue mattis ex, quis dignissim felis eros eget nibh.
        </p>
      </div>
      <div className='previous_notice'>
        <button className='btn2'>Previous Notice →</button>
      </div>
    </div>
  )
}

export default NoticeBoard