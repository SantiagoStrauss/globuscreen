// pages/page.tsx
'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export const runtime = 'edge';

interface FormData {
  email: string;
  password: string;
  name: string;
}

interface Message {
  type: 'success' | 'error';
  text: string;
}

export default function AuthPageComponent() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: ''
  })
  const [message, setMessage] = useState<Message | null>(null)

  const searchParams = useSearchParams()
  const defaultTab = searchParams.get('tab') === 'signup' ? 'signup' : 'login'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error

      setMessage({ type: 'success', text: 'Logged in successfully!' })
      router.push('/dashboard-page') // Updated redirect path
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage({ type: 'error', text: error.message || 'An error occurred during login' })
      } else {
        setMessage({ type: 'error', text: 'An unexpected error occurred during login' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { name: formData.name },
        },
      })

      if (error) throw error

      setMessage({ type: 'success', text: 'Signed up successfully!' })
      router.push('/welcome-page') // Redirect after sign up
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage({ type: 'error', text: error.message || 'An error occurred during sign up' })
      } else {
        setMessage({ type: 'error', text: 'An unexpected error occurred during sign up' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{defaultTab === 'signup' ? 'Sign Up' : 'Login'}</CardTitle>
        <CardDescription>
          {defaultTab === 'signup' ? 'Create a new account' : 'Access your account'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={defaultTab}>
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required />
              
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <Button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </Button>
              
              {message && <p className={message.type}>{message.text}</p>}
              
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleSignUp}>
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" value={formData.name} onChange={handleInputChange} required />
              
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required />
              
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <Button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </Button>
              
              {message && <p className={message.type}>{message.text}</p>}
              
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Signing up...' : 'Sign Up'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        {defaultTab === 'login' ? (
          <Link href="/auth-page?tab=signup">Don&apos;t have an account? Sign Up</Link>
        ) : (
          <Link href="/auth-page?tab=login">Already have an account? Login</Link>
        )}
      </CardFooter>
    </Card>
  )
}