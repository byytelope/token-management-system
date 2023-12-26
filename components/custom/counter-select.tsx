import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Counter } from "@/lib/types";

export default function CounterSelect({ counters }: { counters: Counter[] }) {
  return (
    <Select disabled={counters.length === 0}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a counter" />
      </SelectTrigger>
      <SelectContent>
        {counters !== null && counters!.length > 0 && (
          <SelectGroup>
            <SelectLabel>Counters</SelectLabel>
            {counters.map((counter) => (
              <SelectItem key={counter.id} value={counter.id}>
                Counter {counter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
}
