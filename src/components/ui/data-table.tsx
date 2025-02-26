"use client"

import * as React from "react"
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DataTableProps {
  columns: ColumnDef<any>[]
  data: any[]
  setData: React.Dispatch<React.SetStateAction<any[]>>,
  isRowComplete: (row: any) => boolean,
  emptyRow: any
}

export function DataTable({ columns, data, setData, isRowComplete, emptyRow }: DataTableProps) {
  // Watch for changes in the data to add new rows automatically
  React.useEffect(() => {
    if (data.length === 0) {
      // Add initial empty row
      setData([emptyRow])
      return
    }

    // Check if the last row is complete
    // @ts-ignore
    const lastRow = data[data.length - 1]
    if (isRowComplete(lastRow)) {
      // Add new empty row
      setData((old) => [...old, emptyRow])
    }
  }, [data, setData])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // @ts-ignore
    updateData: (rowIndex: number, columnId: string, value: unknown) => {
      setData((old) =>
        old.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...old[rowIndex],
              [columnId]: value,
            }
          }
          return row
        }),
      )
    },
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-zinc-100 dark:bg-zinc-800">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="font-bold px-3">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

