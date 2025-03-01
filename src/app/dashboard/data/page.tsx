import { DataTable } from "@/components/ui/data-table";
import config from "@/app.config";
import { getUser } from "@/lib/auth/user";
import { createAcquisition, getAllAquisitions } from "@/service/acquisitions";
import { createTransfer, getAllTransfers } from "@/service/transfers";
import { redirect } from "next/navigation";
import { acquisitionColumns, emptyAcquisition, isAcquistionComplete } from "@/components/pages/data/acquisitions";
import { emptyTransfer, isTransferComplete, transferColumns } from "@/components/pages/data/transfers";
import { Acquisition, Transfer } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function DataPage() {
  const user = await getUser();
  if (!user)
    return redirect(config.auth.signInUrl);
  const aquisitions = await getAllAquisitions(user.id);
  const transfers = await getAllTransfers(user.id);

  const saveAcquisition = async (row: Acquisition) => {
    "use server";
    await createAcquisition(row, user.id);
    revalidatePath("/dashboard/data");
  }
  const saveTransfer = async (row: Transfer) => {
    "use server";
    await createTransfer(row, user.id);
    revalidatePath("/dashboard/data");
  }

  return (
    <div className="container mx-auto">
      <h2 id="acquisitions" className="py-4 font-extrabold text-xl">ACQUISITIONS/ENTRÉES</h2>
      <DataTable columns={acquisitionColumns} initialData={aquisitions} isRowComplete={isAcquistionComplete} saveRow={saveAcquisition} emptyRow={emptyAcquisition} />

      <h2 id="transfers" className="py-4 font-extrabold text-xl">CESSIONS/SORTIES</h2>
      <DataTable columns={transferColumns} initialData={transfers} isRowComplete={isTransferComplete} saveRow={saveTransfer} emptyRow={emptyTransfer} />
    </div>
  )
}

