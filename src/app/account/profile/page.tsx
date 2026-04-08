import type { Metadata } from 'next'
import { AccountProfileClient } from '@/components/account/account-profile-client'

export const metadata: Metadata = {
  title: 'Your profile',
  description: 'View and edit your account details and profile photo.',
}

export default function AccountProfilePage() {
  return <AccountProfileClient />
}
