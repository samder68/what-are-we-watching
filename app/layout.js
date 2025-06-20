// ===== app/layout.js =====
import './globals.css'

export const metadata = {
  title: 'What Are We Watching',
  description: 'Track, share, and discover your streaming journey',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}