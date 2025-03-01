"use client";

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

export interface EditableCellProps {
  value?: number | string
  row: number
  column: string
  // @ts-ignore
  updateData: (rowIndex: number, columnId: string, value: any) => void
  children?: React.ReactNode | string,
  isText?: boolean
  className?: string
}

export const EditableCell = ({ value: initialValue, row: rowIndex, column, updateData, children, isText, className }: EditableCellProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialValue)
  const cellRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cellRef.current && !cellRef.current.contains(event.target as Node)) {
        setIsEditing(false)
        if (value !== initialValue)
          updateData(rowIndex, column, value)
      }
    }

    if (isEditing)
      document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isEditing, updateData, rowIndex, column, value])

  if (!isEditing) {
    return (
      <div
        onClick={() => setIsEditing(true)}
        className={cn(
          className,
          "h-8 flex items-center px-2 cursor-pointer rounded overflow-hidden",
          "hover:bg-muted/50 transition-colors",
          !initialValue && "text-muted-foreground italic",
        )}
      >
        {!isText
          ? initialValue
          : initialValue || "Click to edit..."}
      </div>
    )
  }

  return <div className={className} ref={cellRef}>{children}</div>
}