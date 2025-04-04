import { Input } from "@/shared/ui/input"
import { Search } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

interface NpaSearchProps {
  searchTerm: string
  onSearchChange: Dispatch<SetStateAction<string>>
}

export const NpaSearch = ({ searchTerm, onSearchChange }: NpaSearchProps) => (
  <div className="relative mb-4">
    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
    <Input
      placeholder="Поиск по названию или категории..."
      className="pl-8"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  </div>
)