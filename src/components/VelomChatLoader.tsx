'use client'

import dynamic from 'next/dynamic'

const VelomChat = dynamic(() => import('@/components/VelomChat'), {
  ssr: false,
  loading: () => null,
})

export default function VelomChatLoader() {
  return <VelomChat />
}
