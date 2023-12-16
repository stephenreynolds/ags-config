import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
import { setupCursorHover } from '../../misc/cursorHover.js';
import MaterialIcon from '../../misc/MaterialIcon.js';
import TodoList from './TodoList.js';

function checkLeapYear(year) {
    return year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);
}

function getMonthDays(month, year) {
    const leapYear = checkLeapYear(year);
    if ((month <= 7 && month % 2 == 1) || (month >= 8 && month % 2 == 0)) {
        return 31;
    }
    if (month == 2 && leapYear) {
        return 29;
    }
    if (month == 2 && !leapYear) {
        return 28;
    }
    return 30;
}

function getNextMonthDays(month, year) {
    const leapYear = checkLeapYear(year);
    if (month == 1 && leapYear) {
        return 29;
    }
    if (month == 1 && !leapYear) {
        return 28;
    }
    if (month == 12) {
        return 31;
    }
    if ((month <= 7 && month % 2 == 1) || (month >= 8 && month % 2 == 0)) {
        return 30;
    }
    return 31;
}

function getPrevMonthDays(month, year) {
    const leapYear = checkLeapYear(year);
    if (month == 3 && leapYear) {
        return 29;
    }
    if (month == 3 && !leapYear) {
        return 28;
    }
    if (month == 1) {
        return 31;
    }
    if ((month <= 7 && month % 2 == 1) || (month >= 8 && month % 2 == 0)) {
        return 30;
    }
    return 31;
}

export function getCalendarLayout(dateObject, highlight) {
    if (!dateObject) {dateObject = new Date();}
    const weekday = (dateObject.getDay() + 6) % 7; // MONDAY IS THE FIRST DAY OF THE WEEK
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const weekdayOfMonthFirst = (weekday + 35 - (day - 1)) % 7;
    const daysInMonth = getMonthDays(month, year);
    const daysInNextMonth = getNextMonthDays(month, year);
    const daysInPrevMonth = getPrevMonthDays(month, year);

    // Fill
    var monthDiff = (weekdayOfMonthFirst == 0 ? 0 : -1);
    var toFill, dim;
    if (weekdayOfMonthFirst == 0) {
        toFill = 1;
        dim = daysInMonth;
    }
    else {
        toFill = (daysInPrevMonth - (weekdayOfMonthFirst - 1));
        dim = daysInPrevMonth;
    }
    var calendar = [ ...Array(6) ].map(() => Array(7));
    var i = 0, j = 0;
    while (i < 6 && j < 7) {
        calendar[i][j] = {
            'day': toFill,
            'today': ((toFill == day && monthDiff == 0 && highlight) ? 1 : (
                monthDiff == 0 ? 0 :
                    -1
            )),
        };
        // Increment
        toFill++;
        if (toFill > dim) { // Next month?
            monthDiff++;
            if (monthDiff == 0)
            {dim = daysInMonth;}
            else if (monthDiff == 1)
            {dim = daysInNextMonth;}
            toFill = 1;
        }
        // Next tile
        j++;
        if (j == 7) {
            j = 0;
            i++;
        }

    }
    return calendar;
}

let calendarJson = getCalendarLayout(undefined, true);
let monthShift = 0;

function getDateInXMonthsTime(x) {
    const currentDate = new Date();
    let targetMonth = currentDate.getMonth() + x;
    let targetYear = currentDate.getFullYear();

    targetYear += Math.floor(targetMonth / 12);
    targetMonth = (targetMonth % 12 + 12) % 12;

    return new Date(targetYear, targetMonth, 1);
}

const weekDays = [
    { day: 'Su', today: 0 },
    { day: 'Mo', today: 0 },
    { day: 'Tu', today: 0 },
    { day: 'We', today: 0 },
    { day: 'Th', today: 0 },
    { day: 'Fr', today: 0 },
    { day: 'Sa', today: 0 },
];

const CalendarDay = (day, today) => Widget.Button({
    class_name: `sidebar-calendar-btn ${today === 1 ? 'sidebar-calendar-btn-today' : today === -1 ? 'sidebar-calendar-btn-othermonth' : ''}`,
    child: Widget.Overlay({
        child: Widget.Box({}),
        overlays: [
            Widget.Label({
                class_name: 'text-base text-semibold sidebar-calendar-btn-txt',
                hpack: 'center',
                label: String(day),
            }),
        ],
    }),
});

const Calendar = () => {
    const calendarMonthYear = Widget.Button({
        class_name: 'text text-xl sidebar-calendar-monthyear-btn',
        on_clicked: () => shiftCalendarXMonths(0),
        setup: (button) => {
            const month = new Date().toLocaleString('default', { month: 'long' });
            const year = new Date().getFullYear();
            button.label = `${month} ${year}`;
            setupCursorHover(button);
        },
    });
    const addCalendarChildren = (box, calendarJson) => {
        box.children = calendarJson.map((row) => Widget.Box({
            class_name: 'spacing-h-5',
            children: row.map((day) => CalendarDay(day.day, day.today)),
        }));
    };
    function shiftCalendarXMonths(x) {
        monthShift = x === 0 ? 0 : monthShift + x;
        const newDate = monthShift === 0 ? new Date() : getDateInXMonthsTime(monthShift);
        calendarJson = getCalendarLayout(newDate, monthShift === 0);
        const date = newDate.toLocaleString('default', { month: 'long' });
        const year = newDate.getFullYear();
        calendarMonthYear.label = `${monthShift === 0 ? '' : '• '}${date} ${year}`;
        addCalendarChildren(calendarDays, calendarJson);
    }
    const calendarHeader = Widget.Box({
        class_name: 'spacing-h-5 sidebar-calendar-header',
        setup: (box) => {
            box.pack_start(calendarMonthYear, false, false, 0);
            box.pack_end(Widget.Box({
                class_name: 'spacing-h-5',
                children: [
                    Widget.Button({
                        class_name: 'sidebar-calendar-monthshift-btn',
                        on_clicked: () => shiftCalendarXMonths(-1),
                        child: MaterialIcon('chevron_left', 'xl'),
                        setup: (button) => setupCursorHover(button),

                    }),
                    Widget.Button({
                        class_name: 'sidebar-calendar-monthshift-btn',
                        on_clicked: () => shiftCalendarXMonths(1),
                        child: MaterialIcon('chevron_right', 'xl'),
                        setup: (button) => setupCursorHover(button),
                    }),
                ],
            }), false, false, 0);
        },
    });
    const calendarDays = Widget.Box({
        hexpand: true,
        vertical: true,
        class_name: 'spacing-v-5',
        setup: (box) => addCalendarChildren(box, calendarJson),
    });
    return Widget.EventBox({
        on_scroll_up: () => shiftCalendarXMonths(-1),
        on_scroll_down: () => shiftCalendarXMonths(1),
        child: Widget.Box({
            hpack: 'center',
            child: Widget.Box({
                hexpand: true,
                vertical: true,
                class_name: 'spacing-v-5',
                children: [
                    calendarHeader,
                    Widget.Box({
                        class_name: 'spacing-h-5',
                        homogeneous: true,
                        children: weekDays.map((day) => CalendarDay(day.day, day.today)),
                    }),
                    calendarDays,
                ],
            }),
        }),
    });
};

const defaultShown = 'calendar';
const contentStack = Widget.Stack({
    hexpand: true,
    items: [
        [ 'calendar', Calendar() ],
        [ 'todo', TodoList() ],
    ],
    transition: 'slide_up_down',
    transition_duration: 180,
    setup: (stack) => Utils.timeout(1, () => {
        stack.shown = defaultShown;
    }),
});

const StackButton = (stackItemName, icon, name) => Widget.Button({
    class_name: 'button-minsize sidebar-navrail-btn sidebar-button-alone text-sm spacing-h-5',
    on_clicked: (button) => {
        contentStack.shown = stackItemName;
        const children = button.get_parent().get_children();
        for (let i = 0; i < children.length; i++) {
            if (children[i] !== button) {
                children[i].toggleClassName('sidebar-navrail-btn-active', false);
            }
            else {
                button.toggleClassName('sidebar-navrail-btn-active', true);
            }
        }
    },
    child: Widget.Box({
        class_name: 'spacing-v-5',
        vertical: true,
        children: [
            Widget.Label({
                class_name: 'text icon-material text-3xl',
                label: icon,
            }),
            Widget.Label({
                class_name: 'text text-base',
                label: name,
            }),
        ],
    }),
    setup: (button) => Utils.timeout(1, () => {
        button.toggleClassName('sidebar-navrail-btn-active', defaultShown === stackItemName);
        setupCursorHover(button);
    }),
});

export default () => Widget.Box({
    class_name: 'sidebar-group spacing-h-5',
    vertical: true,
    child: Widget.Box({
        setup: (box) => {
            box.pack_start(Widget.Box({
                vpack: 'center',
                homogeneous: true,
                vertical: true,
                class_name: 'sidebar-navrail spacing-v-10',
                children: [
                    StackButton('calendar', 'calendar_month', 'Calendar'),
                    StackButton('todo', 'lists', 'To Do'),
                ],
            }), false, false, 0);
            box.pack_end(contentStack, false, false, 0);
        },
    }),
});
