import {sveltekit} from '@sveltejs/kit/vite';
import {defineConfig} from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    server: {
        port: 3002,
        fs: {
			// TODO FIX SCETCHY allow full directory
            allow: [
                ".."
            ]
        }
    }
});
