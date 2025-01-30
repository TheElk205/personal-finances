import moment from "moment/moment";
import {db} from "@/db";
import {and, desc, gte, lte, sql} from "drizzle-orm";
import {bookingData} from "@/db/schema";
import ExpenseBars from "@/app/monthly-digest/expense-bars";

export default async function MonthlyReport({
                                           searchParams,
                                       }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { limit = "-1", offset = "0", from = undefined, to = undefined} = await searchParams
    const start = moment(from).toDate();
    const end = moment(to).toDate()

    // select
    // DATE_TRUNC('month', booking_date) as booking_month,
    // sum(amount)
    // from booking_data
    // group by DATE_TRUNC('month', booking_date)
    // order by booking_month desc
    const expenses = await db.select({
        bookingMonth: sql<string>`DATE_TRUNC('month', ${bookingData.bookingDate})`,
        amount: sql<number>`cast(sum(${bookingData.amount}) as real)`,
    })
        .from(bookingData)
        // .where(and(
        //         gte(bookingData.bookingDate, start),
        //         lte(bookingData.bookingDate, end),
        //         lte(bookingData.amount, 0)
        //     )
        // )
        .groupBy(sql<string>`DATE_TRUNC('month', ${bookingData.bookingDate})`)
        .orderBy(sql<string>`DATE_TRUNC('month', ${bookingData.bookingDate})`)

    console.info(expenses)

    const truncatedDates = expenses.map(expense => {
        return {
            bookingMonth: `${expense.bookingMonth.split("-")[0]}-${expense.bookingMonth.split("-")[1]}`,
            amount: expense.amount,
        }
    })

    return (
        <div className="container mx-auto py-10">
            <ExpenseBars chartData={truncatedDates} />
        </div>
    )
}