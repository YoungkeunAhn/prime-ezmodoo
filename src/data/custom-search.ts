import { addDays, addMonths, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns'

type CustomRangeType = {
    label: string
    range: { startDate: Date; endDate: Date }
}

export const customRange: CustomRangeType[] = [
    {
        label: '오늘',
        range: {
            startDate: new Date(),
            endDate: new Date(),
        },
    },
    {
        label: '어제',
        range: {
            startDate: addDays(new Date(), -1),
            endDate: addDays(new Date(), -1),
        },
    },
    {
        label: '이번주',
        range: {
            startDate: startOfWeek(new Date()),
            endDate: endOfWeek(new Date()),
        },
    },
    {
        label: '지난주',
        range: {
            startDate: startOfWeek(addDays(new Date(), -7)),
            endDate: endOfWeek(addDays(new Date(), -7)),
        },
    },
    {
        label: '최근7일',
        range: {
            startDate: addDays(new Date(), -6),
            endDate: new Date(),
        },
    },
    {
        label: '최근30일',
        range: {
            startDate: addDays(new Date(), -29),
            endDate: new Date(),
        },
    },
    {
        label: '이번달',
        range: {
            startDate: startOfMonth(new Date()),
            endDate: endOfMonth(new Date()),
        },
    },
    {
        label: '저번달',
        range: {
            startDate: startOfMonth(addMonths(new Date(), -1)),
            endDate: endOfMonth(addMonths(new Date(), -1)),
        },
    },
    {
        label: '전체',
        range: {
            startDate: new Date('1999-01-01'),
            endDate: new Date('2999-01-01'),
        },
    },
]
