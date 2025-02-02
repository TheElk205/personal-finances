import {db} from "@/db";
import {bookingData} from "@/db/schema";
import {DataTable} from "@/app/money/overview/data-table";
import {columns} from "@/app/settings/similarBookings/columns";
import {sql} from "drizzle-orm";

export default async function SimilarBookings() {

    const toSee = "aigner"

    const distinctNames = await db.selectDistinctOn(
        [bookingData.partnerName],
        {partnerName: bookingData.partnerName})
        .from(bookingData)
        .orderBy(bookingData.partnerName)
    ;

    const allMappings = await Promise.all(distinctNames.map(async name => {
        const bookings = await db.selectDistinctOn(
            [bookingData.partnerName],
            {
                partnerName: bookingData.partnerName,
                similarity: sql`similarity(${bookingData.partnerName}, ${name.partnerName})`
            })
            .from(bookingData)
            .where(sql`${bookingData.partnerName} % ${name}`)
            .orderBy(bookingData.partnerName)
        ;
        return {
            name: name.partnerName,
            similar: bookings
        };
    }))
    const categories : { partnerNames: string[]}[] = []
    allMappings.forEach(mapping => {

        if (categories.find( category => {
            return category.partnerNames.find( partnerName => partnerName === mapping.name) !== undefined
        }) === undefined)
        {
            categories.push({ partnerNames: mapping.similar.map(sim => sim.partnerName)});
        }
    })

    console.info(`All mappings: ${allMappings.length}`);
    console.info(`mappings: ${allMappings[220].name}`);
    const similar = categories.map( (cat, index) => {
        return {
            name: index,
            similarity: 0,
            embedding: cat.partnerNames,
        }
    })

    return (
        <div className="container mx-auto py-10">
            Here we will render similar bookings. First live, later recalculate and persist in Database
            Similar to: {toSee}
            <DataTable columns={columns} data={similar} />
        </div>
    )
}