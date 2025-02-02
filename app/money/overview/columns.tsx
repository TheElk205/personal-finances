"use client"
import { ColumnDef } from "@tanstack/react-table"
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";

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
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Booking Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
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
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
]