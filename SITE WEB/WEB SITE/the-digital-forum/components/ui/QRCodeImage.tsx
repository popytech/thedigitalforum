'use client'

import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

interface QRCodeImageProps {
  value: string
  size?: number
}

export default function QRCodeImage({ value, size = 200 }: QRCodeImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    QRCode.toCanvas(canvasRef.current, value, {
      width: size,
      margin: 2,
      color: { dark: '#0A1810', light: '#FFFFFF' },
      errorCorrectionLevel: 'H',
    })
  }, [value, size])

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="rounded-lg"
      style={{ imageRendering: 'pixelated' }}
    />
  )
}
