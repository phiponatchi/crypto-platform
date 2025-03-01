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
import { Transfer } from "@/db/schema"


export const isTransferComplete = (row: Transfer): boolean => {
  return row.date !== undefined && row.date !== "" && row.cryptoactif.trim() !== "" && row.quantiteVendu > 0 && row.prixCession > 0 && row.frais > 0;
}

export const emptyTransfer = {
  date: undefined,
  cryptoactif: "",
  quantiteVendu: 0,
  pma: 0,
  prixCession: 0,
  frais: 0,
  pmvLatente: 0,
  prixAcquisition: 0,
}


export const transferColumns: ColumnDef<Transfer>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row, table }) => {
      const value = row.getValue("date") as Date
      // @ts-ignore
      const { updateData } = table.options

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
              locale={fr}
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
      const value = row.getValue("cryptoactif") as string
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
    accessorKey: "quantiteVendu",
    header: "Quantité Vendu",
    cell: ({ row, table }) => {
      const value = row.getValue("quantiteVendu") as number
      // @ts-ignore
      const { updateData } = table.options

      return (
        <EditableCell value={value} row={row.index} column="quantiteVendu" updateData={updateData} className="w-36">
          <Input
            type="number"
            value={value}
            onChange={(e) => {
              const newValue = Number.parseFloat(e.target.value)
              updateData(row.index, "quantiteVendu", newValue)
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
    accessorKey: "pma",
    header: "Prix moyen d'achat",
    cell: ({ row }) => {
      const value = row.getValue("pma") as number
      return (
        <div className="h-8 flex items-center px-2 text-muted-foreground w-36 overflow-hidden">
          {value
            ? value.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            : "_"}
        </div>
      )
    },
  },
  {
    accessorKey: "prixCession",
    header: "Prix de cession",
    cell: ({ row, table }) => {
      const value = row.getValue("prixCession") as number
      // @ts-ignore
      const { updateData } = table.options

      return (
        <EditableCell value={value} row={row.index} column="prixCession" updateData={updateData} className="w-32">
          <Input
            type="number"
            value={value}
            onChange={(e) => {
              const newValue = Number.parseFloat(e.target.value)
              updateData(row.index, "prixCession", newValue)
            }}
            className="h-8 w-32"
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
    accessorKey: "frais",
    header: "Frais",
    cell: ({ row, table }) => {
      const value = row.getValue("frais") as number
      // @ts-ignore
      const { updateData } = table.options

      return (
        <EditableCell value={value} row={row.index} column="frais" updateData={updateData} className="w-32">
          <Input
            type="number"
            value={value}
            onChange={(e) => {
              const newValue = Number.parseFloat(e.target.value)
              updateData(row.index, "frais", newValue)
            }}
            className="h-8 w-32"
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
    accessorKey: "pmvLatente",
    header: "PMV Latente",
    cell: ({ row }) => {
      const value = row.getValue("pmvLatente") as number
      return (
        <div className="h-8 flex items-center px-2 text-muted-foreground w-36 overflow-hidden">
          {value
            ? value.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            : "_"}
        </div>
      )
    },
  },
  {
    accessorKey: "prixAcquisition",
    header: "Prix d'acquisition",
    cell: ({ row }) => {
      const value = row.getValue("prixAcquisition") as number
      return (
        <div className="h-8 flex items-center px-2 text-muted-foreground w-36 overflow-hidden">
          {value ? value : "_"}
        </div>
      )
    },
  },
]


