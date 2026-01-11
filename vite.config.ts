import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace REPO_NAME with your actual GitHub repo name, e.g., "artistgallery"
export default defineConfig({
  base: '/ArtistGallery/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})