import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Season = {
    id: number
    season_num: number
    name: string
    start_date: string
    end_date: string
}

export const columns: ColumnDef<Season>[] = [
    {
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Season #
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        accessorKey: 'season_num',
    },
    {
        header: 'Name',
        accessorKey: 'name',
    },
    {
        header: 'Start Date',
        accessorKey: 'start_date',
    },
    {
        header: 'End Date',
        accessorKey: 'end_date',
    },
]