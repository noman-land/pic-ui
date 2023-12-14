import { getImages } from './api';
import { Env } from './types';

export default {
  async fetch(
    request: Request,
    env: Env,
  ): Promise<Response> {
    if (request.method !== 'GET') {
      return new Response(null, { status: 404 });
    }

    const results = await getImages(env);

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            * {
              box-sizing: border-box;
            }
            html, body {
              background: #111;
              padding: 0;
              margin: 0;
            }
            img {
              height: 480px;
              width: 480px;
            }
            .wrapper {
              display: flex;
              flex-wrap: wrap;
              position: relative;
            }
            .item {
              height: 480px;
              width: 480px;
              display: inline-block;
              position: relative;
              margin: 8px;
            }
            .prompt {
              background: rgba(0,0,0,0.5);
              position: absolute;
              bottom: 0;
              color: white;
              padding: 4px 8px;
              margin: 0;
              font-weight: normal;
              font-family: Verdana, Arial, sans-serif;
            }
            .item:hover .prompt {
              display: none;
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            ${results.map(({ prompt, id }) => `
              <div class="item">
                <h2 class="prompt">${decodeURIComponent(prompt)}</h2>
                <img src="https://${env.MEDIA_URL}/pic/${id}">
              </div>
            `).join('')}
          </div>
        </body>
      </html>
    `

    return new Response(html, {
      status: 201,
      headers: {
        'content-type': 'text/html; charset=utf-8',
      }
    });
  },
};
