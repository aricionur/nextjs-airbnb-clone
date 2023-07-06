'use client'

import { useEffect } from 'react'
import EmptyState from './components/core/EmptyState'

interface ErrorPageProps {
  error: Error
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
  useEffect(() => console.log(error), [error])

  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />
}

export default ErrorPage
