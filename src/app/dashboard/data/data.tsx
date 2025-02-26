"use client"

import { useState } from "react"
import { DataTable } from "@/components/ui/data-table"
import { acquisitionColumns, emptyAcquisition, isAcquistionComplete } from "./acquisitions"
import { transferColumns, isTransferComplete, emptyTransfer } from "./transfers"
import { Acquisition, Transfer } from "@/types/models"

export default function Data() {
  const [acquisitions, setAcquisitions] = useState<Acquisition[]>([])
  const [transfers, setTransfers] = useState<Transfer[]>([])

  return (
    <div className="container mx-auto">
      <h2 id="inputs" className="py-4 font-extrabold text-xl">ACQUISITIONS/ENTRÉES</h2>
      <DataTable columns={acquisitionColumns} data={acquisitions} setData={setAcquisitions} isRowComplete={isAcquistionComplete} emptyRow={emptyAcquisition} />

      <h2 id="transfers" className="py-4 font-extrabold text-xl">CESSIONS/SORTIES</h2>
      <DataTable columns={transferColumns} data={transfers} setData={setTransfers} isRowComplete={isTransferComplete} emptyRow={emptyTransfer} />
    </div>
  )
}