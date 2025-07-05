import { resolve } from "node:path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import { ViteMinifyPlugin } from "vite-plugin-minify";

const configs = {
	global: {},
	meta: {},
};

const root = resolve(__dirname, "src/pages");

// TODO: remove once https://github.com/alexlafroscia/vite-plugin-handlebars/issues/192 is resolved
function handlebarsOverride(options) {
	const plugin = handlebars(options);
	// Currently handleHotUpdate skips further processing, which bypasses
	// postcss and in turn tailwind doesn't pick up file changes
	plugin.handleHotUpdate = undefined;
	return plugin;
}

export default defineConfig(async () => {
	return {
		root: root,
		publicDir: resolve(__dirname, "public"),
		build: {
			outDir: resolve(__dirname, "dist"),
			emptyOutDir: true,
			rollupOptions: {
				input: resolve(__dirname, "src/pages/index.html"),
			},
		},
		plugins: [
			// input https://www.npmjs.com/package/html-minifier-terser options
			ViteMinifyPlugin({}),
			handlebarsOverride({
				partialDirectory: [
					resolve(__dirname, "src/includes/globals"),
					resolve(__dirname, "src/includes/components"),
					resolve(__dirname, "src/includes/modules"),
				],
			}),
		],
	};
});
