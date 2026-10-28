import { ImageResponse } from 'next/og';
export const alt = 'MPDEE Development — Big ideas. Beautifully built.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#f7f6f2',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '62px 76px',
          color: '#20211f',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 26,
            letterSpacing: -1,
          }}
        >
          <svg
            width="34"
            height="32"
            viewBox="0 0 34 32"
            style={{ marginRight: 14 }}
          >
            <path
              d="M17 1 33 30H1L17 1ZM17 11 8 25h18L17 11Z"
              fill="#d8a514"
              fillRule="evenodd"
            />
          </svg>
          <b>mpdee</b>
          <span style={{ fontSize: 15, letterSpacing: 3, marginLeft: 24 }}>
            DEVELOPMENT
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 104,
            fontWeight: 700,
            lineHeight: 1.03,
            letterSpacing: -7,
            marginTop: 57,
          }}
        >
          Big ideas.
          <br />
          Beautifully built.
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 23,
            marginTop: 46,
            borderTop: '2px solid #f6c94b',
            paddingTop: 23,
          }}
        >
          <span>Independent design & development</span>
          <span>development.mpdee.co.uk</span>
        </div>
      </div>
    ),
    size
  );
}
