import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BookingColumn = {
    id: string
    amount: number
    bookingDate: Date
    partnerName: string
    bookingReference: string
}

export const columns: ColumnDef<BookingColumn>[] = [
    {
        accessorKey: "bookingDate",
        header: "Booking Date",
    },
    {
        accessorKey: "partnerName",
        header: "Partner Name",
    },
    {
        accessorKey: "bookingReference",
        header: "Booking Reference",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
]