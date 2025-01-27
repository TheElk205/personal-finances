import {db} from "@/db";
import {bookingData} from "@/db/schema";
import {BookingColumn, columns} from "@/app/overview/columns";
import {DataTable} from "@/app/overview/data-table";

export default async function Overview() {
    const bookings = await db.select().from(bookingData);

    const bookingsTable: BookingColumn[] = bookings.map((booking) => {
        return {
            id: booking.id,
            amount: booking.amount,
            bookingDate: booking.bookingDate,
            partnerName: booking.partnerName,
            bookingReference: booking.bookingReference
        }
    })
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={bookingsTable} />
        </div>
    )
}