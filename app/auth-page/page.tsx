'use client'

import { useState, useMemo } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Lock, Mail, User } from 'lucide-react'

export const runtime = 'edge';

type Language = 'en' | 'es'

interface Translations {
  login: string
  register: string
  email: string
  password: string
  confirmPassword: string
  forgotPassword: string
  loginButton: string
  registerButton: string
  noAccount: string
  alreadyAccount: string
  signUp: string
  signIn: string
  name: string
}

interface AuthInputProps {
  id: string
  type: string
  label: string
  placeholder?: string
  error?: string
  focusedField: string | null
  setFocusedField: React.Dispatch<React.SetStateAction<string | null>>
  validateField: (field: string, value: string) => void
  icon: React.ComponentType<{ className?: string }>
}

const AuthInput: React.FC<AuthInputProps> = ({
  id,
  type,
  label,
  placeholder,
  error,
  focusedField,
  setFocusedField,
  validateField,
  icon: Icon,
}) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <div className="relative">
      <Icon className={`absolute left-3 top-3 h-5 w-5 transition-colors duration-300 ${
        focusedField === id ? 'text-blue-600' : 'text-gray-400'
      }`} />
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className="pl-10 bg-white/50 transition-all duration-300 focus:bg-white"
        onFocus={() => setFocusedField(id)}
        onBlur={(e) => { setFocusedField(null); validateField(id, e.target.value) }}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={`${id}-error`}
        required
      />
    </div>
    {error && <p id={`${id}-error`} className="text-red-600 text-sm">{error}</p>}
  </div>
)

export default function AuthPageComponent() {
  const [language, setLanguage] = useState<Language>('en')
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const searchParams = useSearchParams()
  const router = useRouter()
  const mode = searchParams.get('mode') || 'login'

  const translations: Record<Language, Translations> = useMemo(() => ({
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
    }
  }), [])

  const t = translations[language]

  const validateField = (field: string, value: string) => {
    let error = ''
    if (!value) {
      error = `${t[field as keyof Translations]} is required.`
    } else if (field === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Invalid email address.'
    } else if (field === 'confirmPassword' && value !== errors.password) {
      error = 'Passwords do not match.'
    }
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add submission logic
  }

  const toggleMode = () => {
    router.push(`?mode=${mode === 'login' ? 'register' : 'login'}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 via-blue-50 to-white">
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(to_bottom,white,rgba(255,255,255,0.6))] -z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-blue-100/50 to-transparent -z-10"></div>
      <Card className="w-full max-w-md backdrop-blur-sm bg-white/90 shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-blue-600">GlobusScreen</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(lang => lang === 'en' ? 'es' : 'en')}
              className="bg-white/50 hover:bg-white/80 transition-colors"
              aria-label="Toggle Language"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === 'en' ? 'ES' : 'EN'}
            </Button>
          </div>
          <CardDescription>{mode === 'login' ? t.login : t.register}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={mode} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">{t.login}</TabsTrigger>
              <TabsTrigger value="register">{t.register}</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleSubmit} noValidate>
                <AuthInput
                  id="email"
                  type="email"
                  label={t.email}
                  placeholder="m@example.com"
                  error={errors.email}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                  validateField={validateField}
                  icon={Mail}
                />
                <AuthInput
                  id="password"
                  type="password"
                  label={t.password}
                  error={errors.password}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                  validateField={validateField}
                  icon={Lock}
                />
                <Button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition-colors">
                  {t.loginButton}
                </Button>
              </form>
              <div className="mt-4 text-center">
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  {t.forgotPassword}
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleSubmit} noValidate>
                <AuthInput
                  id="name"
                  type="text"
                  label={t.name}
                  error={errors.name}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                  validateField={validateField}
                  icon={User}
                />
                <AuthInput
                  id="email"
                  type="email"
                  label={t.email}
                  error={errors.email}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                  validateField={validateField}
                  icon={Mail}
                />
                <AuthInput
                  id="password"
                  type="password"
                  label={t.password}
                  error={errors.password}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                  validateField={validateField}
                  icon={Lock}
                />
                <AuthInput
                  id="confirmPassword"
                  type="password"
                  label={t.confirmPassword}
                  error={errors.confirmPassword}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                  validateField={validateField}
                  icon={Lock}
                />
                <Button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition-colors">
                  {t.registerButton}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-600">
          {mode === 'login' ? t.noAccount : t.alreadyAccount}{" "}
          <Button variant="link" size="sm" onClick={toggleMode} className="text-blue-600 hover:underline">
            {mode === 'login' ? t.signUp : t.signIn}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
