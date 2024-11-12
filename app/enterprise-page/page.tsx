"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, Zap, Globe, Users, Briefcase, Building, BarChart, Cog, Headphones } from "lucide-react"
import confetti from 'canvas-confetti'

export const runtime = 'edge';

type TranslationKey = keyof typeof translations["en"];
const translations = {
  en: {
    title: "Enterprise-Grade Compliance Solutions",
    subtitle: "Empower your organization with advanced screening and risk management tools",
    cta: "Schedule a Demo",
    features: "Key Features",
    industries: "Industries We Serve",
    testimonials: "What Our Clients Say",
    customization: "Tailored for Your Needs",
    security: "Enterprise-Grade Security",
    integration: "Seamless Integration",
    analytics: "Advanced Analytics",
    support: "24/7 Dedicated Support",
    scalability: "Unlimited Scalability",
    banking: "Banking",
    finance: "Finance",
    insurance: "Insurance",
    healthcare: "Healthcare",
    technology: "Technology",
    government: "Government",
    testimonial1: "GlobusScreen has revolutionized our compliance process, saving us countless hours and significantly reducing our risk exposure.",
    testimonial2: "The level of customization and support we've received from GlobusScreen is unparalleled. It's not just a product; it's a partnership.",
    customizationText: "Our enterprise solutions are fully customizable to meet your specific compliance needs and workflows.",
    securityText: "Bank-grade encryption and compliance with international data protection regulations ensure your data is always secure.",
    integrationText: "Easily integrate GlobusScreen with your existing systems through our robust API and dedicated integration support.",
    analyticsText: "Gain deep insights into your compliance processes with our advanced analytics and reporting tools.",
    supportText: "Our enterprise clients receive round-the-clock support from our team of compliance experts.",
    scalabilityText: "Whether you're screening thousands or millions of entities, our platform scales to meet your needs.",
    readyToTransform: "Ready to Transform Your Compliance Process?",
    contactSales: "Contact Our Sales Team",
    solutions: "Solutions",
    data: "Data",
    pricing: "Pricing",
    enterprise: "Enterprise",
    login: "Log In",
    signUp: "Sign Up",
    footerSolutions: "Solutions",
    footerCompany: "Company",
    footerLegal: "Legal",
    footerAboutUs: "About Us",
    footerCareers: "Careers",
    footerContact: "Contact",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
    footerCopyright: "All rights reserved.",
    footerDescription: "Ensuring global compliance, one screen at a time.",
    exploreFeature: "Explore Feature"
  },
  es: {
    title: "Soluciones de Cumplimiento de Nivel Empresarial",
    subtitle: "Potencie su organización con herramientas avanzadas de detección y gestión de riesgos",
    cta: "Programar una Demostración",
    features: "Características Principales",
    industries: "Industrias que Servimos",
    testimonials: "Lo que Dicen Nuestros Clientes",
    customization: "Adaptado a sus Necesidades",
    security: "Seguridad de Nivel Empresarial",
    integration: "Integración Perfecta",
    analytics: "Análisis Avanzado",
    support: "Soporte Dedicado 24/7",
    scalability: "Escalabilidad Ilimitada",
    banking: "Banca",
    finance: "Finanzas",
    insurance: "Seguros",
    healthcare: "Salud",
    technology: "Tecnología",
    government: "Gobierno",
    testimonial1: "GlobusScreen ha revolucionado nuestro proceso de cumplimiento, ahorrándonos innumerables horas y reduciendo significativamente nuestra exposición al riesgo.",
    testimonial2: "El nivel de personalización y soporte que hemos recibido de GlobusScreen no tiene paralelo. No es solo un producto; es una asociación.",
    customizationText: "Nuestras soluciones empresariales son completamente personalizables para satisfacer sus necesidades específicas de cumplimiento y flujos de trabajo.",
    securityText: "El cifrado de grado bancario y el cumplimiento de las regulaciones internacionales de protección de datos garantizan que sus datos estén siempre seguros.",
    integrationText: "Integre fácilmente GlobusScreen con sus sistemas existentes a través de nuestra robusta API y soporte de integración dedicado.",
    analyticsText: "Obtenga información profunda sobre sus procesos de cumplimiento con nuestras herramientas avanzadas de análisis e informes.",
    supportText: "Nuestros clientes empresariales reciben soporte las 24 horas del día de nuestro equipo de expertos en cumplimiento.",
    scalabilityText: "Ya sea que esté evaluando miles o millones de entidades, nuestra plataforma se adapta para satisfacer sus necesidades.",
    readyToTransform: "¿Listo para Transformar su Proceso de Cumplimiento?",
    contactSales: "Contacte a Nuestro Equipo de Ventas",
    solutions: "Soluciones",
    data: "Datos",
    pricing: "Precios",
    enterprise: "Empresas",
    login: "Iniciar Sesión",
    signUp: "Registrarse",
    footerSolutions: "Soluciones",
    footerCompany: "Compañía",
    footerLegal: "Legal",
    footerAboutUs: "Acerca de Nosotros",
    footerCareers: "Carreras",
    footerContact: "Contacto",
    footerPrivacy: "Política de Privacidad",
    footerTerms: "Términos de Servicio",
    footerCopyright: "Todos los derechos reservados.",
    footerDescription: "Asegurando el cumplimiento global, una verificación a la vez.",
    exploreFeature: "Explorar Característica"
  }
}

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  key: keyof Pick<typeof translations["en"], 
    "customization" | "security" | "integration" | 
    "analytics" | "support" | "scalability">;
  color: string;
}

const features: Feature[] = [
  { icon: Cog, key: "customization", color: "from-blue-400 to-blue-600" },
  { icon: Shield, key: "security", color: "from-green-400 to-green-600" },
  { icon: Zap, key: "integration", color: "from-yellow-400 to-yellow-600" },
  { icon: BarChart, key: "analytics", color: "from-purple-400 to-purple-600" },
  { icon: Headphones, key: "support", color: "from-red-400 to-red-600" },
  { icon: Users, key: "scalability", color: "from-indigo-400 to-indigo-600" },
]

interface Industry {
  icon: React.ComponentType<{ className?: string }>;
  key: TranslationKey;
}

const industries: Industry[] = [
  { icon: Building, key: "banking" },
  { icon: Briefcase, key: "finance" },
  { icon: Shield, key: "insurance" },
  { icon: Headphones, key: "healthcare" },
  { icon: Globe, key: "technology" },
  { icon: Users, key: "government" },
]

export default function EnterprisePageComponent() {
  const [language, setLanguage] = useState<"en" | "es">("en");
  const [activeFeature, setActiveFeature] = useState<TranslationKey | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start(i => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1 }
      }));
    }
  }, [controls, inView]);

  const t = translations[language];

  // Update the handleFeatureClick function with the explicit type
  const handleFeatureClick = (key: TranslationKey) => {
    setActiveFeature(activeFeature === key ? null : key);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              GlobusScreen
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/solutions" className="text-gray-600 hover:text-blue-600">
                {t.solutions}
              </Link>
              <Link href="/data" className="text-gray-600 hover:text-blue-600">
                {t.data}
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-blue-600">
                {t.pricing}
              </Link>
              <Link href="/enterprise" className="text-blue-600 font-semibold">
                {t.enterprise}
              </Link>
            </div>
            <div className="space-x-4 flex items-center">
              <Link href="/auth" className="text-blue-600 hover:underline">
                {t.login}
              </Link>
              <Button className="bg-blue-600 hover:bg-blue-700">
                {t.signUp}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(lang => lang === 'en' ? 'es' : 'en')}
              >
                {language === 'en' ? 'ES' : 'EN'}
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <motion.h1
            className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t.title}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              {t.cta}
              <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </section>

        <section ref={ref} className="mb-16">
          <motion.h2
            className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t.features}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.key}
                custom={index}
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className={`h-full bg-gradient-to-br ${feature.color} text-white cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                  onClick={() => handleFeatureClick(feature.key)}
                >
                  <CardHeader>
                    <feature.icon className="w-12 h-12 mb-2" />
                    <CardTitle>{t[feature.key]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{t[`${feature.key}Text`]}</p>
                  </CardContent>
                  {activeFeature === feature.key && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 bg-white bg-opacity-20 rounded-b-lg"
                    >
                      <p className="text-sm">{t[`${feature.key}Text`]}</p>
                      <Button variant="secondary" className="mt-4 bg-white text-blue-600 hover:bg-blue-50">
                        {t.exploreFeature}
                      </Button>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">{t.industries}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col items-center justify-center p-4 hover:bg-blue-50 transition-colors duration-300 cursor-pointer group">
                  <industry.icon className="w-12 h-12 text-blue-600 mb-2 group-hover:animate-bounce" />
                  <CardTitle className="text-center text-sm">{t[industry.key]}</CardTitle>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">{t.testimonials}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card  className="bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                <CardContent className="relative">
                  <div className="absolute top-0 left-0 w-16 h-16 bg-blue-500 rounded-br-full"></div>
                  <div className="pt-20">
                    <p className="italic mb-4 text-lg">&quot;{t.testimonial1}&quot;</p>
                    <p className="font-semibold">- John Doe, CEO of Global Bank</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-purple-100 to-blue-100 overflow-hidden">
                <CardContent className="relative">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500 rounded-bl-full"></div>
                  <div className="pt-20">
                    <p className="italic mb-4 text-lg">&quot;{t.testimonial2}&quot;</p>
                    <p className="font-semibold">- Jane Smith, CTO of Tech Innovations</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <motion.section 
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">{t.readyToTransform}</h2>
          <p className="text-xl mb-8">{t.subtitle}</p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="bg-white text-blue-600 hover:bg-blue-50 transform transition-transform duration-300 hover:scale-110"
          >
            {t.contactSales}
            <ArrowRight className="ml-2" />
          </Button>
        </motion.section>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">GlobusScreen</h3>
              <p className="text-sm">{t.footerDescription}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footerSolutions}</h4>
              <ul className="space-y-2">
                <li><Link href="/solutions" className="text-sm hover:underline">{t.solutions}</Link></li>
                <li><Link href="/data" className="text-sm hover:underline">{t.data}</Link></li>
                <li><Link href="/pricing" className="text-sm hover:underline">{t.pricing}</Link></li>
                <li><Link href="/enterprise" className="text-sm hover:underline">{t.enterprise}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footerCompany}</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm hover:underline">{t.footerAboutUs}</Link></li>
                <li><Link href="#" className="text-sm hover:underline">{t.footerCareers}</Link></li>
                <li><Link href="#" className="text-sm hover:underline">{t.footerContact}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footerLegal}</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm hover:underline">{t.footerPrivacy}</Link></li>
                <li><Link href="#" className="text-sm hover:underline">{t.footerTerms}</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2023 GlobusScreen. {t.footerCopyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}