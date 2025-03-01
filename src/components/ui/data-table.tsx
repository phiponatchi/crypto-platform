"use client"

import * as React from "react"
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LoadingCheck } from "./loading-check"

interface DataTableProps {
  columns: ColumnDef<any>[]
  initialData: any[]
  isRowComplete: (row: any) => boolean,
  saveRow: (row: any) => void
  emptyRow: any
}

export function DataTable({ columns, initialData, isRowComplete, saveRow, emptyRow }: DataTableProps) {
  const [data, setData] = React.useState(initialData);
  const [currentIndex, setIndex] = React.useState(-1);
  React.useEffect(() => {
    setData((prevData) => {
      if (prevData.length === 0)
        return [emptyRow]; // Add initial empty row
      return prevData;
    });
  }, [isRowComplete, data]);

  React.useEffect(() => {
    if (currentIndex === -1)
      setData((prevData) => {
        const lastRow = prevData[prevData.length - 1];
        if (isRowComplete(lastRow)) {
          return [...prevData, emptyRow]; // Add new empty row

        }
        return prevData;
      })
  }, [isRowComplete, data, currentIndex]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // @ts-ignore
    updateData: (rowIndex: number, columnId: string, value: any) => {
      const newRow = {
        ...data[rowIndex],
        [columnId]: value,
      };
      setIndex(() => isRowComplete(newRow) ? rowIndex : -1);
      setData((old) => old.map((row, index) => index === rowIndex ? newRow : row))
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
              <TableHead className="font-bold px-3">
              </TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
                <TableCell className="flex flex-col items-center justify-center w-8">
                  {currentIndex === index && (
                    <LoadingCheck saveFn={async () => {
                      const id = await saveRow(data[currentIndex]);
                      setData((old) => old.map((row, index) => index === currentIndex ? { ...row, id } : row));
                    }} onAnimationCompleted={() => setIndex(-1)} />
                  )}
                </TableCell>
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

