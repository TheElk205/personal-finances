import { pgTable, text, real, timestamp } from "drizzle-orm/pg-core";
import {uuid} from "drizzle-orm/pg-core/columns/uuid";

// Define the table schema
export const bookingData = pgTable("booking_data", {
    id: uuid().primaryKey().defaultRandom(),
    bookingDate: timestamp("booking_date", { withTimezone: true }).notNull(),
    partnerName: text("partner_name").notNull(),
    partnerIban: text("partner_iban").notNull(),
    bicSwift: text("bic_swift").notNull(),
    partnerAccountNumber: text("partner_account_number").notNull(),
    bankCode: text("bank_code").notNull(),
    amount: real("amount").notNull(),
    currency: text("currency").notNull(),
    bookingDetails: text("booking_details").notNull(),
    bookingReference: text("booking_reference").notNull(),
    note: text("note"),
    paidWith: text("paid_with").notNull(),
    paymentReference: text("payment_reference").notNull(),
    ownAccountName: text("own_account_name").notNull(),
    ownIban: text("own_iban").notNull(),
});