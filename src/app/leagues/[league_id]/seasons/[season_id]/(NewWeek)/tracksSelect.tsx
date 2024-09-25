import * as React from "react"
import { useState, useCallback, useRef, ChangeEvent, useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface Option {
  value: string
  label: string
}

interface TracksSelectProps {
    data: Option[],
    onSelect: (selectedItem: Option | null) => void;
}


export default function TracksSelect({ data, onSelect }: TracksSelectProps) {
  const [filter, setFilter] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState<Option | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filterOptions = useCallback((options: Option[], filter: string) => {
    return options.filter(option =>
      option.label.toLowerCase().includes(filter.toLowerCase())
    )
  }, [])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
  }

  const handleSelectChange = (value: string) => {
    const selectedItem = data.find(item => item.value === value) || null
    setSelectedTrack(selectedItem)
    onSelect(selectedItem)
    setOpen(false)
  }

  const filteredOptions = filterOptions(data, filter)

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    }
  }, [open])

  return (
      <Select
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen)
          if (!isOpen) setFilter("")
        }}
      onValueChange={handleSelectChange}
      >
        <SelectTrigger className="">
          <SelectValue placeholder="Select a track for da week" />
        </SelectTrigger>
        <SelectContent>
            <div className="flex items-center px-3 pb-2">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Input
                ref={inputRef}
                placeholder="Search tracks"
                value={filter}
                onChange={handleInputChange}
                className="h-8 w-full bg-transparent focus:ring-0 focus:ring-offset-0"
              />
            </div>
          {filteredOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
          {filteredOptions.length === 0 && (
            <SelectItem value="no-results" disabled>
              No results found | {filter}
            </SelectItem>
          )}
        </SelectContent>
      </Select>
  )
}