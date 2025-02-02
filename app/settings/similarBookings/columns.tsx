"use client"
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";

export const columns: ColumnDef<{  name: string, similarity: number, embedding: string }>[] = [
    {
        accessorKey: "name",
        header: "Partner Name"
    },
    {
        accessorKey: "similarity",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Similarity
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "embedding",
        header: "Embeddings"
    },
]