import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Share2Icon } from 'lucide-react'

export default function ReferralSystem() {
  const [referralLink, setReferralLink] = useState('')

  const generateReferralLink = () => {
    // In a real app, you'd generate a unique referral link here
    const uniqueCode = Math.random().toString(36).substring(7)
    setReferralLink(`https://impcton.app/ref/${uniqueCode}`)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
    alert('Referral link copied to clipboard!')
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Referral System</h2>
      <Button onClick={generateReferralLink} className="mb-4">
        <Share2Icon className="mr-2 h-4 w-4" />
        Generate Referral Link
      </Button>
      {referralLink && (
        <div className="flex items-center gap-2">
          <Input value={referralLink} readOnly />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      )}
    </Card>
  )
}