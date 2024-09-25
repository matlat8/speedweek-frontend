"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type ComboBoxProps = {
    data: { value: string; label: string }[],
    title: string
  }
  
  export function CarTrackCombobox({ data, title }: ComboBoxProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [searchTerm, setSearchTerm] = React.useState("")
  
    const filteredData = data.filter(item =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
  
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? data.find((item) => item.value === value)?.label
              : `Select ${title}...`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder={`Search ${title}...`}
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
            <CommandList className="max-h-48 overflow-y-auto">
              <CommandEmpty>No {title} found.</CommandEmpty>
              <CommandGroup>
                {filteredData.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }