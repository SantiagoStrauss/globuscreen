'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle2, User, Building2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define types for the API request and response
interface PersonQuery {
  queries: {
    match: {
      schema: "Person"
      properties: {
        name: string[]
        nationality: string[]
      }
    }
  }
}

interface CompanyQuery {
  queries: {
    match: {
      schema: "Company"
      properties: {
        name: string[]
        jurisdiction: string[]
      }
    }
  }
}

interface ApiResponse {
  status: string
  data: any
  timestamp: string
  requestBody: PersonQuery | CompanyQuery
}

export function Page() {
  const router = useRouter()
  const [searchType, setSearchType] = useState<'person' | 'company'>('person')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [activeView, setActiveView] = useState<'request' | 'response'>('response')

  // Form states
  const [personForm, setPersonForm] = useState({
    name: '',
    nationality: ''
  })
  const [companyForm, setCompanyForm] = useState({
    name: '',
    jurisdiction: ''
  })

  const createRequestBody = (): PersonQuery | CompanyQuery => {
    if (searchType === 'person') {
      return {
        queries: {
          match: {
            schema: "Person",
            properties: {
              name: [personForm.name],
              nationality: [personForm.nationality]
            }
          }
        }
      }
    } else {
      return {
        queries: {
          match: {
            schema: "Company",
            properties: {
              name: [companyForm.name],
              jurisdiction: [companyForm.jurisdiction]
            }
          }
        }
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const requestBody = createRequestBody()

    try {
          // Replace with your actual API endpoint
          const res = await fetch('https://api.opensanctions.org/match/default', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'ApiKey 4001f04a498f7e6ab3e23d2679897531',
            },
            body: JSON.stringify(requestBody),
          })

      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`)
      }

      const data = await res.json()
      setResponse({
        status: 'success',
        data,
        timestamp: new Date().toISOString(),
        requestBody
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const formatJson = (json: any): string => {
    return JSON.stringify(json, null, 2)
  }

  const isFormValid = () => {
    if (searchType === 'person') {
      return personForm.name.trim() && personForm.nationality.trim()
    } else {
      return companyForm.name.trim() && companyForm.jurisdiction.trim()
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Entity</CardTitle>
          <CardDescription>
            Search for persons or companies in our database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={searchType} onValueChange={(v) => setSearchType(v as 'person' | 'company')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="person" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Person
              </TabsTrigger>
              <TabsTrigger value="company" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Company
              </TabsTrigger>
            </TabsList>

            <TabsContent value="person">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="personName">Full Name</Label>
                  <Input
                    id="personName"
                    placeholder="e.g., Oscar Javier Gonzalez Vargas"
                    value={personForm.name}
                    onChange={(e) => setPersonForm({ ...personForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    placeholder="e.g., Colombia"
                    value={personForm.nationality}
                    onChange={(e) => setPersonForm({ ...personForm, nationality: e.target.value })}
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading || !isFormValid()}
                  className="w-full"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Searching...' : 'Search Person'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="company">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    placeholder="e.g., Gazprom"
                    value={companyForm.name}
                    onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jurisdiction">Jurisdiction</Label>
                  <Input
                    id="jurisdiction"
                    placeholder="e.g., Russia"
                    value={companyForm.jurisdiction}
                    onChange={(e) => setCompanyForm({ ...companyForm, jurisdiction: e.target.value })}
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading || !isFormValid()}
                  className="w-full"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Searching...' : 'Search Company'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6"
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                    Results
                  </CardTitle>
                  <span className="text-sm text-gray-500">
                    {new Date(response.timestamp).toLocaleString()}
                  </span>
                </div>
                <CardDescription>
                  View the request and response data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeView} onValueChange={(v) => setActiveView(v as 'request' | 'response')}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="request">Request Body</TabsTrigger>
                    <TabsTrigger value="response">Response</TabsTrigger>
                  </TabsList>
                  <TabsContent value="request">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <pre className="whitespace-pre-wrap break-words text-sm">
                        {formatJson(response.requestBody)}
                      </pre>
                    </div>
                  </TabsContent>
                  <TabsContent value="response">
                    <div className="rounded-lg bg-gray-50 p-4 overflow-x-auto">
                      <pre className="text-sm">
                        {formatJson(response.data)}
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}