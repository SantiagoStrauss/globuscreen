'use client'

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image" // Added import for Next.js Image component
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Shield, Zap, Globe, Building, Landmark, Plane, ShoppingBag, Stethoscope, Umbrella, Phone, Car, GraduationCap, Wheat } from "lucide-react" // Removed BarChart, Users, Briefcase

export const runtime = 'edge';

export function LandingPageComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCustomer, setActiveCustomer] = useState(0)
  const [language, setLanguage] = useState<'en' | 'es'>('en')
  const [animatedNumbers, setAnimatedNumbers] = useState({
    entitiesScreened: 0,
    accuracyRate: 0,
    globalWatchlists: 0,
  })
  const [isVisible, setIsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement | null>(null) // Added TypeScript type
  const [heroWord, setHeroWord] = useState(language === 'en' ? 'Simple' : 'Simple')

  const customers = [
    { name: "GlobalBank", logo: "/placeholder.svg?height=80&width=80", quote: "GlobusScreen ha revolucionado nuestro proceso de cumplimiento." },
    { name: "TechCorp", logo: "/placeholder.svg?height=80&width=80", quote: "Eficiente y confiable. Un cambio de juego para nuestra gestión de riesgos." },
    { name: "MegaRetail", logo: "/placeholder.svg?height=80&width=80", quote: "Cobertura completa y fácil de usar. Altamente recomendado." },
  ]

  const industries = [
    { name: language === 'en' ? "Banking" : "Banca", icon: Landmark },
    { name: language === 'en' ? "Technology" : "Tecnología", icon: Globe },
    { name: language === 'en' ? "Retail" : "Comercio minorista", icon: ShoppingBag },
    { name: language === 'en' ? "Healthcare" : "Salud", icon: Stethoscope },
    { name: language === 'en' ? "Travel" : "Viajes", icon: Plane },
    { name: language === 'en' ? "Real Estate" : "Bienes raíces", icon: Building },
    { name: language === 'en' ? "Insurance" : "Seguros", icon: Umbrella },
    { name: language === 'en' ? "Energy" : "Energía", icon: Zap },
    { name: language === 'en' ? "Telecommunications" : "Telecomunicaciones", icon: Phone },
    { name: language === 'en' ? "Automotive" : "Automotriz", icon: Car },
    { name: language === 'en' ? "Education" : "Educación", icon: GraduationCap },
    { name: language === 'en' ? "Agriculture" : "Agricultura", icon: Wheat },
  ]

  const translations = {
    en: {
      solutions: "Solutions",
      data: "Data",
      pricing: "Pricing",
      enterprise: "Enterprise",
      login: "Login",
      signUp: "Sign Up",
      heroTitle: "Sanctions List Screening Made",
      heroSubtitle: "Ensure compliance and mitigate risks with our advanced sanctions screening service",
      getStarted: "Get Started",
      fastScreening: "Fast Screening",
      fastScreeningDesc: "Screen entities against multiple sanctions lists in seconds",
      completeCoverage: "Complete Coverage",
      completeCoverageDesc: "Access to global sanctions and watchlists",
      complianceAssurance: "Compliance Assurance",
      complianceAssuranceDesc: "Stay compliant with international regulations",
      trustedBy: "Trusted by Industry Leaders",
      byTheNumbers: "GlobusScreen by the Numbers",
      entitiesScreened: "Entities Screened",
      accuracyRate: "Accuracy Rate",
      globalWatchlists: "Global Watchlists",
      support: "Support Available",
      completeSolutions: "Complete Solutions",
      individualScreening: "Individual Screening",
      batchProcessing: "Batch Processing",
      apiIntegration: "API Integration",
      readyToStreamline: "Ready to streamline your compliance process?",
      startFreeTrial: "Start Your Free Trial",
      industriesServed: "Industries We Serve",
      footer: {
        tagline: "Ensuring global compliance, one screen at a time.",
        solutions: "Solutions",
        company: "Company",
        legal: "Legal",
        aboutUs: "About Us",
        careers: "Careers",
        contact: "Contact",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service",
      },
    },
    es: {
      solutions: "Soluciones",
      data: "Datos",
      pricing: "Precios",
      enterprise: "Empresas",
      login: "Iniciar sesión",
      signUp: "Registrarse",
      heroTitle: "Verificación de Listas de Sanciones Hecha",
      heroSubtitle: "Asegure el cumplimiento y mitigue riesgos con nuestro servicio avanzado de verificación de sanciones",
      getStarted: "Comenzar",
      fastScreening: "Verificación Rápida",
      fastScreeningDesc: "Verifique entidades contra múltiples listas de sanciones en segundos",
      completeCoverage: "Cobertura Completa",
      completeCoverageDesc: "Acceso a sanciones globales y listas de vigilancia",
      complianceAssurance: "Garantía de Cumplimiento",
      complianceAssuranceDesc: "Manténgase en cumplimiento con las regulaciones internacionales",
      trustedBy: "Confiado por Líderes de la Industria",
      byTheNumbers: "GlobusScreen en Números",
      entitiesScreened: "Entidades Verificadas",
      accuracyRate: "Tasa de Precisión",
      globalWatchlists: "Listas de Vigilancia Globales",
      support: "Soporte Disponible",
      completeSolutions: "Soluciones Completas",
      individualScreening: "Verificación Individual",
      batchProcessing: "Procesamiento por Lotes",
      apiIntegration: "Integración API",
      readyToStreamline: "¿Listo para optimizar su proceso de cumplimiento?",
      startFreeTrial: "Comience su Prueba Gratuita",
      industriesServed: "Industrias que Atendemos",
      footer: {
        tagline: "Asegurando el cumplimiento global, una verificación a la vez.",
        solutions: "Soluciones",
        company: "Empresa",
        legal: "Legal",
        aboutUs: "Sobre Nosotros",
        careers: "Carreras",
        contact: "Contacto",
        privacyPolicy: "Política de Privacidad",
        termsOfService: "Términos de Servicio",
      },
    },
  }

  const t = translations[language]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const currentStatsRef = statsRef.current // Stored ref in a variable

    if (currentStatsRef) {
      observer.observe(currentStatsRef)
    }

    return () => {
      if (currentStatsRef) {
        observer.unobserve(currentStatsRef)
      }
    }
  }, [])

  useEffect(() => {
    if (isVisible) {
      const animationDuration = 2000 // 2 seconds
      const steps = 100
      const interval = animationDuration / steps

      let currentStep = 0

      const timer = setInterval(() => {
        setAnimatedNumbers(() => ({ // Removed 'prev' as it wasn't used
          entitiesScreened: Math.min(Math.round((currentStep / steps) * 1000000), 1000000),
          accuracyRate: Math.min(parseFloat(((currentStep / steps) * 99.9).toFixed(1)), 99.9),
          globalWatchlists: Math.min(Math.round((currentStep / steps) * 200), 200),
        }))

        currentStep++

        if (currentStep > steps) {
          clearInterval(timer)
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [isVisible])

  useEffect(() => {
    const words = language === 'en'
      ? ['Simple', 'Fast', 'Reliable', 'Complete']
      : ['Simple', 'Rápida', 'Confiable', 'Completa']
    let index = 0
    const interval = setInterval(() => {
      setHeroWord(words[index])
      index = (index + 1) % words.length
    }, 3000)
    return () => clearInterval(interval)
  }, [language])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">GlobusScreen</div>
            <div className="hidden md:flex space-x-6">
              <Link href="/solutions-page" className="text-gray-600 hover:text-blue-600">{t.solutions}</Link>
              <Link href="/data-page" className="text-gray-600 hover:text-blue-600">{t.data}</Link>
              <Link href="/pricing-page" className="text-gray-600 hover:text-blue-600">{t.pricing}</Link>
              <Link href="/enterprise-page" className="text-gray-600 hover:text-blue-600">{t.enterprise}</Link>
            </div>
            <div className="hidden md:flex space-x-4 items-center">
              <Link href="/dashboard-page" className="text-blue-600 hover:underline">
                {t.login}
              </Link>
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/auth-page?mode=signup">{t.signUp}</Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(lang => lang === 'en' ? 'es' : 'en')}
              >
                {language === 'en' ? 'ES' : 'EN'}
              </Button>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>
          </nav>
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-4">
              <Link href="#" className="block text-gray-600 hover:text-blue-600">{t.solutions}</Link>
              <Link href="#" className="block text-gray-600 hover:text-blue-600">{t.data}</Link>
              <Link href="#" className="block text-gray-600 hover:text-blue-600">{t.pricing}</Link>
              <Link href="#" className="block text-gray-600 hover:text-blue-600">{t.enterprise}</Link>
              <Link href="/auth-page?mode=login" className="block text-blue-600 hover:underline">
                {t.login}
              </Link>
              <Button className="block bg-blue-600 hover:bg-blue-700 w-full" asChild>
                <Link href="/auth-page?mode=signup">{t.signUp}</Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="block w-full"
                onClick={() => setLanguage(lang => lang === 'en' ? 'es' : 'en')}
              >
                {language === 'en' ? 'ES' : 'EN'}
              </Button>
            </div>
          )}
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">
              {t.heroTitle}
            </h1>
            <p className="text-5xl font-bold text-blue-600 mb-4 transition-all duration-500 ease-in-out">
              {heroWord}
            </p>
            <p className="text-xl text-gray-600 mb-8">
              {t.heroSubtitle}
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/signup">{t.getStarted}</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-blue-200">
              <CardHeader>
                <Zap className="w-10 h-10 text-blue-600 mb-2" />
                <CardTitle>{t.fastScreening}</CardTitle>
                <CardDescription>{t.fastScreeningDesc}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-blue-200">
              <CardHeader>
                <Shield className="w-10 h-10 text-blue-600 mb-2" />
                <CardTitle>{t.completeCoverage}</CardTitle>
                <CardDescription>{t.completeCoverageDesc}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-blue-200">
              <CardHeader>
                <CheckCircle className="w-10 h-10 text-blue-600 mb-2" />
                <CardTitle>{t.complianceAssurance}</CardTitle>
                <CardDescription>{t.complianceAssuranceDesc}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">{t.trustedBy}</h2>
            <div className="flex justify-center items-center space-x-8 mb-8">
              {customers.map((customer, index) => (
                <div
                  key={index}
                  className={`cursor-pointer transition-opacity duration-300 ${
                    index === activeCustomer ? "opacity-100" : "opacity-50"
                  }`}
                  onMouseEnter={() => setActiveCustomer(index)}
                >
                  {/* Replaced <img> with <Image /> */}
                  <Image
                    src={customer.logo}
                    alt={customer.name}
                    width={80} // Set appropriate width
                    height={80} // Set appropriate height
                    className="w-20 h-20"
                  />
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-xl italic mb-2">&quot;{customers[activeCustomer].quote}&quot;</p> {/* Escaped quotes */}
              <p className="font-semibold">{customers[activeCustomer].name}</p>
            </div>
          </div>
        </section>

        <section ref={statsRef} className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-8">{t.byTheNumbers}</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600">{animatedNumbers.entitiesScreened.toLocaleString()}+</CardTitle>
                <CardDescription>{t.entitiesScreened}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600">{animatedNumbers.accuracyRate}%</CardTitle>
                <CardDescription>{t.accuracyRate}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600">{animatedNumbers.globalWatchlists}+</CardTitle>
                <CardDescription>{t.globalWatchlists}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600">24/7</CardTitle>
                <CardDescription>{t.support}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">{t.completeSolutions}</h2>
            <Tabs defaultValue="individual" className="w-full max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="individual">{t.individualScreening}</TabsTrigger>
                <TabsTrigger value="batch">{t.batchProcessing}</TabsTrigger>
                <TabsTrigger value="api">{t.apiIntegration}</TabsTrigger>
              </TabsList>
              <TabsContent value="individual">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.individualScreening}</CardTitle>
                    <CardDescription>{language === 'en' ? 'Quick and easy screening for individual entities' : 'Verificación rápida y fácil para entidades individuales'}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>{language === 'en' ? 'Instant results' : 'Resultados instantáneos'}</li>
                      <li>{language === 'en' ? 'Detailed match information' : 'Información detallada de coincidencias'}</li>
                      <li>{language === 'en' ? 'User-friendly interface' : 'Interfaz fácil de usar'}</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="batch">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.batchProcessing}</CardTitle>
                    <CardDescription>{language === 'en' ? 'Efficient screening for large datasets' : 'Verificación eficiente para grandes conjuntos de datos'}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>{language === 'en' ? 'Upload CSV or Excel files' : 'Carga de archivos CSV o Excel'}</li>
                      <li>{language === 'en' ? 'Process thousands of entries' : 'Procesa miles de entradas'}</li>
                      <li>{language === 'en' ? 'Downloadable results' : 'Resultados descargables'}</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="api">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.apiIntegration}</CardTitle>
                    <CardDescription>{language === 'en' ? 'Seamless integration with your existing systems' : 'Integración perfecta con sus sistemas existentes'}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>{language === 'en' ? 'RESTful API' : 'API RESTful'}</li>
                      <li>{language === 'en' ? 'Webhooks for real-time updates' : 'Webhooks para actualizaciones en tiempo real'}</li>
                      <li>{language === 'en' ? 'Comprehensive documentation' : 'Documentación completa'}</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-8">{t.industriesServed}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="border-blue-200">
                <CardHeader className="text-center">
                  <industry.icon className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <CardTitle>{industry.name}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{t.readyToStreamline}</h2>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/signup">{t.startFreeTrial}</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">GlobusScreen</h3>
              <p className="text-sm">{t.footer.tagline}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footer.solutions}</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm hover:underline">{t.individualScreening}</Link></li>
                <li><Link href="#" className="text-sm hover:underline">{t.batchProcessing}</Link></li>
                <li><Link href="#" className="text-sm hover:underline">{t.apiIntegration}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footer.company}</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm hover:underline">{t.footer.aboutUs}</Link></li>
                <li><Link href="#" className="text-sm hover:underline">{t.footer.careers}</Link></li>
                <li><Link href="#" className="text-sm hover:underline">{t.footer.contact}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm hover:underline">{t.footer.privacyPolicy}</Link></li>
                <li><Link href="#" className="text-sm hover:underline">{t.footer.termsOfService}</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2023 GlobusScreen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}