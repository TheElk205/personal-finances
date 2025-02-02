import {db} from "@/db";
import {bookingData} from "@/db/schema";
import {BookingColumn, columns} from "@/app/money/overview/columns";
import {DataTable} from "@/app/money/overview/data-table";
import {and, desc, gte, lte, sql} from "drizzle-orm";
import moment from "moment";
import {DatePickerWithRange} from "@/app/money/overview/date-range-selection";
import {CustomRadialChart} from "@/app/money/overview/radial-chart";

export default async function Overview({
                                           searchParams,
                                       }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { limit = "-1", offset = "0", from = undefined, to = undefined} = await searchParams
    const start = moment(from).toDate();
    const end = moment(to).toDate()

    const bookings = await db.select()
        .from(bookingData)
        .limit(+limit)
        .offset(+offset)
        .where(and(
            gte(bookingData.bookingDate, start),
            lte(bookingData.bookingDate, end))
        )
        .orderBy(desc(bookingData.bookingDate))
    ;

    const expenses = await db.select({
        amount: sql<number>`cast(sum(${bookingData.amount}) as real)`,
        count: sql<number>`cast(count(${bookingData.amount}) as int)`,
    })
        .from(bookingData)
        .where(and(
            gte(bookingData.bookingDate, start),
            lte(bookingData.bookingDate, end),
            lte(bookingData.amount, 0)
            )
        );

    const income = await db.select({
        amount: sql<number>`cast(sum(${bookingData.amount}) as real)`,
        count: sql<number>`cast(count(${bookingData.amount}) as int)`,
    })
        .from(bookingData)
        .where(and(
                gte(bookingData.bookingDate, start),
                lte(bookingData.bookingDate, end),
                gte(bookingData.amount, 0)
            )
        );

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
            <DatePickerWithRange />
            <CustomRadialChart title="split" income={income[0].amount} expense={expenses[0].amount}/>
            <DataTable columns={columns} data={bookingsTable} />
        </div>
    )
}