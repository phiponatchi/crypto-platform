"use client"

import type React from "react"

import type { ColumnDef } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { EditableCell } from "@/components/ui/editable-cell"
import { Acquisition } from "@/db/schema"
import { useEffect } from "react"


export const isAcquistionComplete = (row: Acquisition): boolean => {
  return row.date !== undefined && row.date !== "" && row.cryptoactif?.trim() !== "" && row.montantInvesti > 0 && row.quantiteAchetee > 0
}

export const emptyAcquisition = {
  date: undefined,
  cryptoactif: "",
  montantInvesti: 0,
  coursAchat: 0,
  quantiteAchetee: 0,
}


export const acquisitionColumns: ColumnDef<Acquisition>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row, table }) => {
      const value = row.getValue("date") as Date | undefined;
      // @ts-ignore
      const { updateData } = table.options;

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="w-32"
              variant={"outline"}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(value, "P", { locale: fr }) : <span>Choisir date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={(date) => updateData(row.index, "date", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )
    },
  },
  {
    accessorKey: "cryptoactif",
    header: "Cryptoactif",
    cell: ({ row, table }) => {
      const value = row.getValue<string>("cryptoactif")

      // @ts-ignore
      const { updateData } = table.options

      return (
        <EditableCell value={value} row={row.index} column="cryptoactif" updateData={updateData} className="w-28" isText>
          <Input
            value={value}
            onChange={(e) => updateData(row.index, "cryptoactif", e.target.value)}
            className="h-8 w-28"
            placeholder="Ex: BTC"
            autoFocus
          />
        </EditableCell>
      )
    },
  },
  {
    accessorKey: "montantInvesti",
    header: "Montant investi",
    cell: ({ row, table }) => {
      const value = row.getValue<number>("montantInvesti")

      // @ts-ignore
      const { updateData } = table.options

      return (
        <EditableCell value={Number.isNaN(value) ? 0 : value} row={row.index} column="montantInvesti" updateData={updateData} className="w-36">
          <Input
            type="number"
            value={Number.isNaN(value) ? 0 : value}
            onChange={(e) => {
              const newValue = Number.parseFloat(e.target.value)
              updateData(row.index, "montantInvesti", newValue)
            }}
            className="h-8 w-36"
            placeholder="0.00"
            step="0.01"
            min="0"
            autoFocus
          />
        </EditableCell>
      )
    },
  },
  {
    accessorKey: "coursAchat",
    header: "Cours d'achat",
    cell: ({ row, table }) => {
      // @ts-ignore
      const { updateData } = table.options
      const quantite = row.getValue<number>("quantiteAchetee");
      const montant = row.getValue<number>("montantInvesti");
      const value = quantite > 0 ? montant / quantite : 0;
      useEffect(() => {
        updateData(row.index, "coursAchat", value);
      }, [value])
      return (
        <div className="flex h-8 w-28 items-center px-2 text-muted-foreground overflow-ellipsis">
          {value ? value : "_"}
        </div>
      )
    },
  },
  {
    accessorKey: "quantiteAchetee",
    header: "Quantité achetée",
    cell: ({ row, table }) => {
      const value = row.getValue<number>("quantiteAchetee")
      // @ts-ignore
      const { updateData } = table.options

      return (
        <EditableCell value={Number.isNaN(value) ? 0 : value} row={row.index} column="quantiteAchetee" updateData={updateData} className="w-48">
          <Input
            type="number"
            value={Number.isNaN(value) ? 0 : value}
            onChange={(e) => {
              const newValue = Number.parseFloat(e.target.value)
              updateData(row.index, "quantiteAchetee", newValue)
            }}
            className="h-8 w-48"
            placeholder="0.00"
            step="0.01"
            min="0"
            autoFocus
          />
        </EditableCell>
      )
    },
  },
]


