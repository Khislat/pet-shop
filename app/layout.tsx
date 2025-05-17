import React from 'react'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BowBow Pet Shop',
  description: 'Quality pet products and services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Recursive:wght@400;500;600;700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Luckiest+Guy:wght@400&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Palanquin:wght@400&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@600&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  )
}
