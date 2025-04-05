import "./style.css";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";
import typescriptLogo from "./typescript.svg";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
    <div class="flex space-x-8 mb-6">
      <a href="https://vite.dev" target="_blank" class="transition-transform hover:scale-110">
        <img src="${viteLogo}" class="h-16 w-auto" alt="Vite logo" />
      </a>
      <a href="https://www.typescriptlang.org/" target="_blank" class="transition-transform hover:scale-110">
        <img src="${typescriptLogo}" class="h-16 w-auto" alt="TypeScript logo" />
      </a>
    </div>
    <h1 class="text-4xl font-bold text-gray-800 mb-8">Vite + TypeScript</h1>
    <div class="card bg-white p-6 rounded-lg shadow-md mb-8 w-full max-w-md">
      <button id="counter" type="button" class="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"></button>
    </div>
    <p class="text-sm text-gray-500 italic">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
