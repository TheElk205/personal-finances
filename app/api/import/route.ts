import {NextResponse} from "next/server";
import {db} from "@/db";
import {bookingData} from "@/db/schema";
import moment from "moment";

export async function POST(req: Request) {
    try {
        const form = await req.formData();
        const file = form.get("file-input"); // -> has to have the same name given in the form data object (client side)

        if (!file) return NextResponse.json({ message: "failure" });

        const isFile = file instanceof File;

        if (!isFile) return NextResponse.json({ message: "failure" });

        const buffer = await file.arrayBuffer();
        const decoder = new TextDecoder();
        const str = decoder.decode(buffer);
        const lines = str.split("\n");
        console.info(lines[0])
        // Reading columns form input CSV
        const headerLine = lines[0];
        const columns = headerLine.split(",").map(col => col.replaceAll("\"",""));

        const headers: string[] = [
            'Booking Date',
            'Partner Name',
            'Partner IBAN',
            'BIC/SWIFT',
            'Partner Account Number',
            'Bank code',
            'Amount',
            'Currency',
            'Booking details',
            'Booking Reference',
            'Note',
            'Paid with',
            'Payment Reference',
            'Own account name',
            'Own IBAN'
        ]

        const headerMappings: { [x: string]: number } = {}
        // Checking if csv headers are in expected columns
        columns.forEach((column, index) => {
            if (headers.find(header => header === column) === undefined )
            {
                console.error(`column ${column} not found`);
            }
            else {
                headerMappings[column] = index
            }
        })

        console.info(columns);
        const bookings: (typeof bookingData.$inferInsert)[] = []
        lines.forEach((line, index) => {
            if (index === 0) return;
            const columns = line.split(",").map(col => col.replaceAll("\"",""))
            if (columns.length <= 1) return;

            // console.info("Adding to DB", columns)
            console.info("date", headerMappings["Booking Date"])
            console.info("date", columns[headerMappings["Booking Date"]])
            try {
                const bookingDate = moment(columns[headerMappings["Booking Date"]], "DD.MM.YYYY")
                console.info("bookingDate", bookingDate)
                // if (!(bookingDate instanceof Date )|| isNaN(bookingDate.getTime()))
                // {
                //     throw new Error(`bookingDate was undefined from string: ${columns[headerMappings["Booking Date"]]}`)
                // }

                const toBook: typeof bookingData.$inferInsert = {
                    bankCode: columns[headerMappings["Bank code"]],
                    bicSwift: columns[headerMappings["BIC/SWIFT"]],
                    bookingDate: bookingDate.toDate(),
                    bookingDetails: columns[headerMappings["Booking details"]],
                    bookingReference: columns[headerMappings["Booking Reference"]],
                    currency: columns[headerMappings["Currency"]],
                    ownAccountName: columns[headerMappings["Own account name"]],
                    ownIban: columns[headerMappings["Own IBAN"]],
                    paidWith: columns[headerMappings["Paid with"]],
                    partnerAccountNumber: columns[headerMappings["Partner Account Number"]],
                    partnerIban: columns[headerMappings["Partner IBAN"]],
                    partnerName: columns[headerMappings["Partner Name"]],
                    paymentReference: columns[headerMappings["Payment Reference"]],
                    amount: +columns[headerMappings["Amount"]]
                }

                bookings.push(toBook)
                // db.insert(bookingData).values(toBook)
            }
            catch (error) {
                console.error(`Error reading entry ${line}:`, error)
            }
        })
        await db.insert(bookingData).values(bookings)
        console.info("Success upload")
        return NextResponse.json({ message: "success" });
    } catch (reason) {
        console.error(reason);
        return NextResponse.json({ message: "failure" });
    }
}