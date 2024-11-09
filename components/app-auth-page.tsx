'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Lock, Mail, User } from "lucide-react"

export function Page() {
  const [language, setLanguage] = useState<'en' | 'es'>('en')
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const translations = {
    en: {
      login: "Login",
      register: "Register",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      forgotPassword: "Forgot password?",
      loginButton: "Log in",
      registerButton: "Sign up",
      noAccount: "Don't have an account?",
      alreadyAccount: "Already have an account?",
      signUp: "Sign up",
      signIn: "Sign in",
      name: "Full Name",
      company: "Company Name",
      errorOccurred: "An error occurred. Please try again.",
      successfulLogin: "Successfully logged in!",
      successfulRegister: "Successfully registered! Please check your email for verification.",
    },
    es: {
      login: "Iniciar sesión",
      register: "Registrarse",
      email: "Correo electrónico",
      password: "Contraseña",
      confirmPassword: "Confirmar contraseña",
      forgotPassword: "¿Olvidaste tu contraseña?",
      loginButton: "Iniciar sesión",
      registerButton: "Registrarse",
      noAccount: "¿No tienes una cuenta?",
      alreadyAccount: "¿Ya tienes una cuenta?",
      signUp: "Regístrate",
      signIn: "Inicia sesión",
      name: "Nombre completo",
      company: "Nombre de la empresa",
      errorOccurred: "Ocurrió un error. Por favor, inténtalo de nuevo.",
      successfulLogin: "¡Inicio de sesión exitoso!",
      successfulRegister: "¡Registro exitoso! Por favor, revisa tu correo electrónico para verificar tu cuenta.",
    }
  }

  const t = translations[language]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      toast({
        title: t.successfulLogin,
        duration: 3000,
      })
      router.push('/dashboard')
    } catch (error) {
      toast({
        title: t.errorOccurred,
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            company: company,
          },
        },
      })
      if (error) throw error
      toast({
        title: t.successfulRegister,
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: t.errorOccurred,
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'es' : 'en')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-blue-600">GlobusScreen</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === 'en' ? 'ES' : 'EN'}
            </Button>
          </div>
          <CardDescription>{t.login}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t.login}</TabsTrigger>
              <TabsTrigger value="register">{t.register}</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.email}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">{t.password}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700" type="submit" disabled={isLoading}>
                  {isLoading ? 'Loading...' : t.loginButton}
                </Button>
              </form>
              <div className="mt-4 text-center">
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  {t.forgotPassword}
                </Link>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  {t.noAccount}{' '}
                  <Link 
                    href="#"
                    onClick={() => document.querySelector('[value="register"]')?.click()}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    {t.signUp}
                  </Link>
                </p>
              </div>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.name}</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        className="pl-10"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">{t.company}</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="company"
                        type="text"
                        className="pl-10"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">{t.email}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="m@example.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">{t.password}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="register-password"
                        type="password"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700" type="submit" disabled={isLoading}>
                  {isLoading ? 'Loading...' : t.registerButton}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            {t.alreadyAccount}{' '}
            <Link 
              href="#"
              onClick={() => document.querySelector('[value="login"]')?.click()}
              className="text-blue-600 hover:underline font-semibold"
            >
              {t.signIn}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}