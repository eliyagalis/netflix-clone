import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server:{
    port:5174,
    proxy:{ //שרת פייפאל שיקבל בקשות דרך הסרבר
      "/paypal":"http://127.0.0.1.3000"
    },
  }
})
