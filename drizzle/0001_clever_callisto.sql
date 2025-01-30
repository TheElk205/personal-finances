CREATE TABLE "booking_data" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_date" timestamp with time zone NOT NULL,
	"partner_name" text NOT NULL,
	"partner_iban" text NOT NULL,
	"bic_swift" text NOT NULL,
	"partner_account_number" text NOT NULL,
	"bank_code" text NOT NULL,
	"amount" real NOT NULL,
	"currency" text NOT NULL,
	"booking_details" text NOT NULL,
	"booking_reference" text NOT NULL,
	"note" text,
	"paid_with" text NOT NULL,
	"payment_reference" text NOT NULL,
	"own_account_name" text NOT NULL,
	"own_iban" text NOT NULL
);
--> statement-breakpoint
CREATE INDEX "partner_name_trgm_index" ON "booking_data" USING GIST ("partner_name" gist_trgm_ops,"id");