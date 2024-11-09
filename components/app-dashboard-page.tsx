'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Search, Building, User } from "lucide-react"

type SearchResult = {
  id: string
  name: string
  [key: string]: any
}

export function Page() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const { toast } = useToast()

  const handleSearch = async (schema: 'Person' | 'Company', data: any) => {
    setIsLoading(true)
    setResults([])

    const body = {
      queries: {
        match: {
          schema,
          properties: data
        }
      }
    }

    try {
      const response = await fetch('https://api.example.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'ApiKey 4001f04a498f7e6ab3e23d2679897531'
        },
        body: JSON.stringify(body)
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const result = await response.json()
      setResults(result.data || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch results. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">GlobusScreen Dashboard</h1>
      <Tabs defaultValue="person" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="person">Search People</TabsTrigger>
          <TabsTrigger value="company">Search Companies</TabsTrigger>
        </TabsList>
        <TabsContent value="person">
          <Card>
            <CardHeader>
              <CardTitle>Person Search</CardTitle>
              <CardDescription>Search for individuals by name and nationality.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                handleSearch('Person', {
                  name: [formData.get('personName')],
                  nationality: [formData.get('nationality')]
                })
              }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="personName">Name</Label>
                  <Input id="personName" name="personName" placeholder="Enter full name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input id="nationality" name="nationality" placeholder="Enter nationality" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                  Search
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Search</CardTitle>
              <CardDescription>Search for companies by name and jurisdiction.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                handleSearch('Company', {
                  name: [formData.get('companyName')],
                  jurisdiction: [formData.get('jurisdiction')]
                })
              }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" name="companyName" placeholder="Enter company name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jurisdiction">Jurisdiction</Label>
                  <Input id="jurisdiction" name="jurisdiction" placeholder="Enter jurisdiction" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                  Search
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {results.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {results.map((result) => (
                <li key={result.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center space-x-2">
                    {result.schema === 'Person' ? (
                      <User className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Building className="h-5 w-5 text-green-500" />
                    )}
                    <h3 className="text-lg font-semibold">{result.name}</h3>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    {Object.entries(result).map(([key, value]) => {
                      if (key !== 'id' && key !== 'name' && key !== 'schema') {
                        return (
                          <p key={key}>
                            <span className="font-medium">{key}: </span>
                            {Array.isArray(value) ? value.join(', ') : value}
                          </p>
                        )
                      }
                      return null
                    })}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}