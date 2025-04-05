import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { ViteMinifyPlugin } from "vite-plugin-minify";

export default defineConfig({
	plugins: [
		// input https://www.npmjs.com/package/html-minifier-terser options
		ViteMinifyPlugin({}),
		tailwindcss(),
	],
});
