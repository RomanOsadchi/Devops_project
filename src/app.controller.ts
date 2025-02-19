import { Controller, Get, Header } from "@nestjs/common";
import { ApiExcludeEndpoint } from "@nestjs/swagger";

@Controller()
export class AppController {
  @Get()
  @ApiExcludeEndpoint()
  @Header("Content-Type", "text/html")
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to NestJS</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            color: white;
            text-align: center;
          }
          .container {
            padding: 2rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 1rem;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          }
          h1 {
            font-size: 3.5rem;
            margin-bottom: 1rem;
          }
          p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            opacity: 0.9;
          }
          .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
          }
          .feature-card {
            background: rgba(255, 255, 255, 0.05);
            padding: 1.5rem;
            border-radius: 0.5rem;
            transition: transform 0.3s ease;
          }
          .feature-card:hover {
            transform: translateY(-5px);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to NestJS! 🚀</h1>
          <h2>Check my devops project that uses Nest.js framework as an app!</h2>
          <p>A progressive Node.js framework for building efficient and scalable server-side applications</p>
          <p>Check swagger documentation using /api endpoint!!!</p>
          
          <div class="features">
            <div class="feature-card">
              <h3>Fast Setup</h3>
              <p>Quick project initialization and development workflow</p>
            </div>
            <div class="feature-card">
              <h3>Scalable</h3>
              <p>Modular structure for large applications</p>
            </div>
            <div class="feature-card">
              <h3>Modern</h3>
              <p>TypeScript-first approach with latest features</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}
