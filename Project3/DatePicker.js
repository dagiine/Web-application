'use strict';

class DatePicker {
    constructor(id, callback) {
        this.id = id;
        this.element = document.getElementById(id);
        this.callback = callback;
    }

    render(date) {
        if (!this.fixedDate) this.fixedDate = date;
        this.currentDate = date;

        const calendar = this.calendarElement(date);
        this.element.append(calendar);
    }

    calendarElement(date) {
        const calendar = document.createElement("div");
        calendar.classList.add("calendar");
       
        // Календарын элементийг толгой хэсэг болон хүснэгт болгон хуваах
        calendar.append(this.calendarHeader(date));
        calendar.append(this.calendarTable(date));

        return calendar; 
    } 

    calendarHeader(date) {
        const header = document.createElement("div");
        header.classList.add("calendarHeader");

        header.append(this.calendarHeaderButton("left"));
        header.append(this.calendarHeaderMonth(date));
        header.append(this.calendarHeaderButton("right"));

        return header;
    }

    calendarTable(date) {
        const table = document.createElement("table");
        table.classList.add("calendarDaysTable");

        table.append(this.weekdaysTableHead());
        table.append(this.weekdaysTableBody(date));

        return table;
    }

    calendarHeaderMonth(date) {
        const headerMonth = document.createElement("span");
        headerMonth.classList.add("calendarHeaderMonth");
    
        const monthNames = ["1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар", "7-р сар", 
            "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар"];

        const headerMonthStr = monthNames[date.getMonth()] + " " + date.getFullYear();
        headerMonth.append(headerMonthStr);

        return headerMonth;
    }

    calendarHeaderButton(buttonType) {
        const headerButton = document.createElement("button");
        headerButton.datePicker = this;
        headerButton.classList.add("calendarHeaderButton");

        if (buttonType === "right") {
            headerButton.append('>');
            headerButton.addEventListener("click", function() {this.datePicker.calendarChangeMonth("next");});
        } else {
            headerButton.append('<');
            headerButton.addEventListener("click", function() {this.datePicker.calendarChangeMonth("previous");});
        }

        return headerButton;
    }

    weekdaysTableHead() {
        const row = document.createElement("tr");

        const weekdayNames = ["Ня", "Да", "Мя", "Лх", "Пү", "Ба", "Бя"];
        for (const day of weekdayNames) {
            const dayElement = document.createElement("th");
            dayElement.classList.add("calendarWeekdayName");

            dayElement.append(day);
            row.append(dayElement);
        }

        const head = document.createElement("thead");
        head.append(row);
        head.classList.add("weekdaysHead");
        return head;
    }
    
    weekdaysTableBody(date) {
        const body = document.createElement("tbody");

        let row = document.createElement("tr");
        row.classList.add("weekdaysRow");

        // Сарын эхний өдрийн өмнөх хоосон нүднүүдийг нэмэх
        const beforeMonthDays = this.offMonthDays(date, "before");
        for (const day of beforeMonthDays) row.append(day);

        // Сарын өдрүүдийг гүйлгэж харуулах
        const indexDate = new Date(date.getFullYear(), date.getMonth());
        let completedMonth = false;

        while (!completedMonth) {
            // Өнөөдрийн өдрийг тодотгох эсэхийг шалгах
            const dayType = ((indexDate.getDate() === this.fixedDate.getDate())
                                && (indexDate.getMonth() === this.fixedDate.getMonth()))
                            ? "currentMonthDay" 
                            : "onMonthDay";
            const dayElement = this.dayElement(indexDate.getDate(), dayType);
            row.append(dayElement);

            // Хэрэв долоо хоног дүүрсэн бол шинэ мөр үүсгэх
            if (indexDate.getDay() === 0) { 
                body.append(row);
                row = document.createElement("tr");
                row.classList.add("weekdaysRow");
            }

            // Өдрийг нэгээр нэмэгдүүлэх
            indexDate.setDate(indexDate.getDate() + 1);
            if (indexDate.getMonth() !== date.getMonth()) completedMonth = true;
        }

        // Сарын сүүлийн өдрийн дараах хоосон нүднүүдийг нэмэх
        const afterMonthDays = this.offMonthDays(date, "after");
        for (const day of afterMonthDays) row.append(day);
        if (row.hasChildNodes()) body.append(row);

        return body;
    }

    offMonthDays(date, when) {
        const days = []; 
        const d = new Date(date);
        let numOffDays = 0;

        if (when === "before") {
            // Өнгөрсөн сарын сүүлийн өдөр
            d.setDate(0); 
            numOffDays = ((d.getDay() + 6) % 7) + 1;

            d.setDate(d.getDate() - numOffDays + 1); // numOffDays-ээр офсет хийх
        } else {
            // Дараагийн сарын эхний өдөр
            d.setMonth(d.getMonth() + 1); d.setDate(1);

            const dayOfWeek = ((d.getDay() + 6) % 7); 
            numOffDays = 7 - dayOfWeek;
        }

        while (numOffDays > 0) {
            const dayElement = this.dayElement(d.getDate(), "offMonthDay");
            days.push(dayElement);

            d.setDate(d.getDate() + 1);
            numOffDays--;
        }

        return days;
    }

    dayElement(day, dayType) {
        const tableDataElement = document.createElement("td");
        const contentElement = document.createElement("div");
        contentElement.classList.add("calendarDay");

        if (dayType === "offMonthDay") {
            contentElement.classList.add("calendarOffMonthDay");
            tableDataElement.classList.add("calendarOffMonthDay");
        } else if (dayType === "onMonthDay") {
            contentElement.classList.add("calendarOnMonthDay");
        } else if (dayType === "currentMonthDay") {
            contentElement.classList.add("calendarCurrentMonthDay");
        }

        contentElement.append(day);

        if (dayType === "onMonthDay" || dayType === "currentMonthDay") {
            contentElement.addEventListener("click", () => {
                const selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
                this.callback(this.id, {
                    year: selectedDate.getFullYear(),
                    month: selectedDate.getMonth() + 1,
                    day: selectedDate.getDate()
                });
            });
        }

        tableDataElement.append(contentElement);

        return tableDataElement;
    }

    calendarChangeMonth(direction) {
        console.log("Сарыг өөрчилсөн: " + direction);
        const inc = ((direction === "next") ? +1 : -1);
        let movedDate = new Date(this.currentDate);
        movedDate.setMonth(movedDate.getMonth() + inc);
        
        // Хэрэв тогтсон сар руу буцвал эхний огноог ашиглах
        if (movedDate.getFullYear() === this.fixedDate.getFullYear() 
            && movedDate.getMonth() === this.fixedDate.getMonth()) movedDate = this.fixedDate;

        this.currentDate = movedDate;

        // Шинэ сарын толгойг шинэчлэх
        this.element.firstChild.firstChild.childNodes[1].replaceWith(
            this.calendarHeaderMonth(this.currentDate)
        );  
        // Шинэ сарын хүснэгтийг шинэчлэх
        this.element.firstChild.lastChild.replaceWith(
            this.calendarTable(this.currentDate)
        );  
    }
}