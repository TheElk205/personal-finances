"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import moment from "moment/moment";
import {useEffect} from "react";

export function DatePickerWithRange(
    // {
    //                                     className,
    //                                 }: React.HTMLAttributes<HTMLDivElement>,
                                    ) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: moment().subtract(30, "day").toDate(),
        to: moment().toDate(),
    })

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        console.log(params.get("from"))
        if (params.get("from") === null)
        {
            last30Days()
        }
    }, []);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function onApply()
    {
        setDateRange(date?.from, date?.to)
    }

    function last30Days()
    {
        const from = moment().subtract(30, "day").toDate()
        const to = moment().toDate()
        setDate({
            from: from,
            to: to,
        })
        setDateRange(from, to)
    }

    function thisMonth()
    {
        const from = moment().startOf("month").toDate();
        const to = moment().toDate()
        setDate({
            from: from,
            to: to,
        })
        setDateRange(from, to)
    }

    function setDateRange(from: Date | undefined, to: Date | undefined)
    {
        const params = new URLSearchParams(searchParams);
        params.set("from", from?.toISOString() ?? "")
        params.set("to", to?.toISOString() ?? "")

        replace(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    }

    return (
        <div className={cn("grid gap-2"/*, className*/)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                    <Button onClick={onApply}>Apply</Button>
                </PopoverContent>
            </Popover>
            <Button onClick={last30Days}>Last 30 days</Button>
            <Button onClick={thisMonth}>This month</Button>
        </div>
    )
}
