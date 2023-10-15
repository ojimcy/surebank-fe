// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

import React from 'react';

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="shortcut icon" href={'/static/img/sbIcon.png'} />
                <link rel="icon" href={'/static/img/sbIcon.png'} sizes="32x32" />
                <link
                    rel="icon"
                    href={'/static/img/sbIcon.png'}
                    sizes="192x192"
                />
                <link
                    rel="apple-touch-icon-precomposed"
                    href={'/static/img/sbIcon.png'}
                />

                <link
                    href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
