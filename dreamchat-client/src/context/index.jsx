/* eslint-disable react/prop-types */
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './AuthContext'

export default function AppProviders({ children }) {
  const queryClient = new QueryClient()
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>{children}</AuthProvider>
        </Router>
      </QueryClientProvider>
    </React.StrictMode>
  )
}
