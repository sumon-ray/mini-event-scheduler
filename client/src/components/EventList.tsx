"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { IEvent } from "@/types/event"
import { useEffect, useState } from "react"
import {
  Search,
  Filter,
  Calendar,
  Clock,
  Archive,
  Trash2,
  MoreVertical,
  Eye,
  EyeOff,
  Sparkles,
  Home,
  Briefcase,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"
import api from "../utils/api"

interface Props {
  refreshTrigger: number
}

const EventList = ({ refreshTrigger }: Props) => {
  const [events, setEvents] = useState<IEvent[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [filterArchived, setFilterArchived] = useState<boolean>(false)
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchEvents = async () => {
    try {
      setIsLoading(true)
      const response = await api.get("/events")
      const data = response.data?.data
      if (Array.isArray(data)) {
        setEvents(data)
      } else {
        console.error("Unexpected format:", response.data)
      }
    } catch (error) {
      console.error("Error fetching events:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [refreshTrigger])

  const handleDelete = async (eventId: string) => {
    try {
      await api.delete(`/events/${eventId}`)
      fetchEvents()
      setDeleteEventId(null)
    } catch (error) {
      console.error("Error deleting event:", error)
    }
  }

  const handleArchive = async (eventId: string, checked: boolean) => {
    try {
      await api.patch(`/events/${eventId}`, {
        archived: checked,
      })
      fetchEvents()
    } catch (error) {
      console.error("Error archiving event:", error)
    }
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      (event.title ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.notes ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.category ?? "").toLowerCase().includes(searchTerm.toLowerCase())
    const matchesArchiveFilter = filterArchived ? event.archived : !event.archived
    return matchesSearch && matchesArchiveFilter
  })

  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case "work":
        return <Briefcase className="w-4 h-4" />
      case "personal":
        return <Home className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case "work":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "personal":
        return "bg-purple-100 text-purple-700 border-purple-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getEventStats = () => {
    const total = events.length
    const archived = events.filter((e) => e.archived).length
    const active = total - archived
    const categories = {
      work: events.filter((e) => e.category?.toLowerCase() === "work").length,
      personal: events.filter((e) => e.category?.toLowerCase() === "personal").length,
      other: events.filter((e) => e.category?.toLowerCase() === "other").length,
    }
    return { total, archived, active, categories }
  }

  const stats = getEventStats()

  if (isLoading) {
    return (
      <div className="container mx-auto min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-600">Loading events...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto min-h-screen space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Event Dashboard
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Manage your events with AI-powered categorization and smart organization
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Events</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                <p className="text-sm text-gray-600">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Archive className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{stats.archived}</p>
                <p className="text-sm text-gray-600">Archived</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round((stats.total > 0 ? (stats.total - stats.archived) / stats.total : 0) * 100)}%
                </p>
                <p className="text-sm text-gray-600">AI Sorted</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls Section */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search events, categories, or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                {filterArchived ? (
                  <EyeOff className="w-4 h-4 text-gray-600" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-600" />
                )}
                <Switch id="filter-archive" checked={filterArchived} onCheckedChange={setFilterArchived} />
                <label htmlFor="filter-archive" className="text-sm font-medium text-gray-700 cursor-pointer">
                  {filterArchived ? "Show Archived" : "Show Active"}
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            {filterArchived ? "Archived Events" : "Active Events"}
            <Badge variant="secondary" className="ml-2">
              {filteredEvents.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredEvents.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-100">
                    <TableHead className="font-semibold text-gray-700">Event Details</TableHead>
                    <TableHead className="font-semibold text-gray-700">Schedule</TableHead>
                    <TableHead className="font-semibold text-gray-700">Category</TableHead>
                    <TableHead className="font-semibold text-gray-700">Notes</TableHead>
                    <TableHead className="text-center font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id} className="border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-semibold text-gray-900">{event.title}</p>
                          <p className="text-xs text-gray-500">ID: {event.id.slice(0, 8)}...</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-900">{event.date}</p>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-gray-400" />
                              <p className="text-xs text-gray-600">{event.time}</p>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`flex items-center gap-1 w-fit ${getCategoryColor(event.category)}`}
                        >
                          {getCategoryIcon(event.category)}
                          {event.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-600 max-w-xs truncate">
                          {event.notes || <span className="text-gray-400 italic">No notes</span>}
                        </p>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <Switch
                            checked={event.archived}
                            onCheckedChange={(checked) => handleArchive(event.id, checked)}
                            aria-label={`Toggle archive status for ${event.title}`}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleArchive(event.id, !event.archived)}
                              className="flex items-center gap-2"
                            >
                              <Archive className="w-4 h-4" />
                              {event.archived ? "Unarchive" : "Archive"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setDeleteEventId(event.id)}
                              className="flex items-center gap-2 text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">No events found</h3>
                  <p className="text-gray-500">
                    {searchTerm
                      ? `No events match "${searchTerm}"`
                      : filterArchived
                        ? "No archived events yet"
                        : "Create your first event to get started"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteEventId} onOpenChange={() => setDeleteEventId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Delete Event
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this event? This action cannot be undone and will permanently remove the
              event from your schedule.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteEventId && handleDelete(deleteEventId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Event
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default EventList
