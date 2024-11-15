'use client'

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Lock } from "lucide-react"
import { EnvelopeClosedIcon, PersonIcon } from "@radix-ui/react-icons"

export const runtime = 'edge';

export function AuthPageComponent() {
  const [language, setLanguage] = useState<'en' | 'es'>('en')
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode') || 'login'

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
    }
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-blue-600">GlobusScreen</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(lang => lang === 'en' ? 'es' : 'en')}
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === 'en' ? 'ES' : 'EN'}
            </Button>
          </div>
          <CardDescription>{mode === 'login' ? t.login : t.register}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={mode} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t.login}</TabsTrigger>
              <TabsTrigger value="register">{t.register}</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.email}</Label>
                    <div className="relative">
                      <EnvelopeClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input id="email" type="email" placeholder="m@example.com" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">{t.password}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input id="password" type="password" className="pl-10" />
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">{t.loginButton}</Button>
              </form>
              <div className="mt-4 text-center">
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  {t.forgotPassword}
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="register">
              <form>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.name}</Label>
                    <div className="relative">
                      <PersonIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input id="name" type="text" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">{t.company}</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input id="company" type="text" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">{t.email}</Label>
                    <div className="relative">
                      <EnvelopeClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input id="register-email" type="email" placeholder="m@example.com" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">{t.password}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input id="register-password" type="password" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">{t.confirmPassword}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input id="confirm-password" type="password" className="pl-10" />
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">{t.registerButton}</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            {mode === 'login' ? t.noAccount : t.alreadyAccount}{' '}
            <Link 
              href={mode === 'login' ? '?mode=register' : '?mode=login'} 
              className="text-blue-600 hover:underline font-semibold"
            >
              {mode === 'login' ? t.signUp : t.signIn}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}