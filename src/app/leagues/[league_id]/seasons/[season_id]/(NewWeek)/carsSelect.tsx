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
  value: string;
  label: string;
}

interface CarsSelectProps {
  data: Option[];
  title: string;
  onSelect: (selectedItem: Option | null) => void;
}

export default function CarsSelect({ data, title, onSelect }: CarsSelectProps) {
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);

  const filterOptions = useCallback((options: Option[], filter: string) => {
    return options.filter(option =>
      option.label.toLowerCase().includes(filter.toLowerCase())
    );
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleSelectChange = (value: string) => {
    const selectedItem = data.find(item => item.value === value) || null;
    setSelectedCar(value);
    onSelect(selectedItem);
    setOpen(false);
  };

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-1/2">
        <SelectValue placeholder={`Select a ${title}`} />
      </SelectTrigger>
      <SelectContent>
        <div className="flex items-center px-3 pb-2">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            ref={inputRef}
            placeholder={`Search ${title}`}
            value={filter}
            onChange={handleInputChange}
            className="h-8 w-full bg-transparent focus:ring-0 focus:ring-offset-0 sticky top-0"
          />
        </div>
        {filterOptions(data, filter).map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
        {filterOptions(data, filter).length === 0 && (
          <SelectItem value="no-results" disabled>
            No results found
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}