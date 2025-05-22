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
       
        calendar.append(this.calendarHeader(date));
        calendar.append(this.calendarTable(date));

        return calendar; 
    } 

    // Calendar толгой хэсэг
    calendarHeader(date) {
        const header = document.createElement("div");
        header.classList.add("calendarHeader");

        // Зүүн, сарын нэр, баруун товчлуурууд
        header.append(this.calendarHeaderButton("left"));
        header.append(this.calendarHeaderMonth(date));
        header.append(this.calendarHeaderButton("right"));

        return header;
    }

    // Calendar хүснэгт үүсгэх
    calendarTable(date) {
        const table = document.createElement("table");
        table.classList.add("calendarDaysTable");

        // Гарагийн нэрс болон өдрүүдийг нэмэх
        table.append(this.weekdaysTableHead());
        table.append(this.weekdaysTableBody(date));

        return table;
    }

    // Сар ба жилийг харуулах 
    calendarHeaderMonth(date) {
        const headerMonth = document.createElement("span");
        headerMonth.classList.add("calendarHeaderMonth");
    
        const monthNames = ["1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар", "7-р сар", 
            "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар"];
    
        const headerMonthStr = monthNames[date.getMonth()] + " " + date.getFullYear();
        headerMonth.append(headerMonthStr);
    
        return headerMonth;
    }

    // Сар солих товчлуур
    calendarHeaderButton(buttonType) {
        const headerButton = document.createElement("button");
        headerButton.datePicker = this;
        headerButton.classList.add("calendarHeaderButton");

        if (buttonType === "right") {
            headerButton.append('>'); 
            headerButton.addEventListener("click", function() {
                this.datePicker.calendarChangeMonth("next");
            });
        } else {
            headerButton.append('<'); 
            headerButton.addEventListener("click", function() {
                this.datePicker.calendarChangeMonth("previous");
            });
        }

        return headerButton;
    }

    // Гарагийн нэр харуулах хэсэг
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
    
    // Өдрүүдийг харуулах хэсэг
    weekdaysTableBody(date) {
        const body = document.createElement("tbody");

        let row = document.createElement("tr");
        row.classList.add("weekdaysRow");

        // Тухайн сарын эхэнээс өмнөх өдрүүдийг нэмэх
        const beforeMonthDays = this.offMonthDays(date, "before");
        for (const day of beforeMonthDays) row.append(day);

        // Тухайн сарын өдрүүдийг нэмэх
        const indexDate = new Date(date.getFullYear(), date.getMonth());
        let completedMonth = false;

        while (!completedMonth) {
            const dayType = ((indexDate.getDate() === this.fixedDate.getDate())
                                && (indexDate.getMonth() === this.fixedDate.getMonth()))
                            ? "currentMonthDay" 
                            : "onMonthDay";
            const dayElement = this.dayElement(indexDate.getDate(), dayType);
            row.append(dayElement);

            // Долоо хоног дууссан эсэхийг шалгах
            if (indexDate.getDay() === 6) { 
                body.append(row);
                row = document.createElement("tr");
                row.classList.add("weekdaysRow");
            }

            indexDate.setDate(indexDate.getDate() + 1);
            if (indexDate.getMonth() !== date.getMonth()) completedMonth = true;
        }

        const afterMonthDays = this.offMonthDays(date, "after");
        for (const day of afterMonthDays) row.append(day);
        if (row.hasChildNodes()) body.append(row);

        return body;
    }

    // Өмнөх болон дараах сарын өдрүүд
    offMonthDays(date, when) {
        const days = []; 
        const d = new Date(date);
        let numOffDays = 0;
    
        if (when === "before") {
            d.setDate(1);
            const firstDayOfWeek = d.getDay(); 
            
            // Өмнөх сараас хэдэн өдөр харуулахыг тооцоолох
            numOffDays = firstDayOfWeek; 
            
            if (numOffDays > 0) {
                d.setDate(0);
                d.setDate(d.getDate() - numOffDays + 1);
            }
        } else {
            d.setMonth(d.getMonth() + 1);
            d.setDate(1);
            
            const lastDayOfWeek = d.getDay(); 
            numOffDays = 7 - lastDayOfWeek;
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

        // Өдрийн төрлөөс хамаарч CSS класс нэмэх
        if (dayType === "offMonthDay") {
            contentElement.classList.add("calendarOffMonthDay");
            tableDataElement.classList.add("calendarOffMonthDay");
        } else if (dayType === "onMonthDay") {
            contentElement.classList.add("calendarOnMonthDay");
        } else if (dayType === "currentMonthDay") {
            contentElement.classList.add("calendarCurrentMonthDay");
        }

        contentElement.append(day);

        // Хэрэв тухайн сарын өдөр бол click event нэмэх
        if (dayType === "onMonthDay" || dayType === "currentMonthDay") {
            contentElement.addEventListener("click", () => {
                const selectedDate = new Date(
                    this.currentDate.getFullYear(),
                    this.currentDate.getMonth(),
                    day
                );
                
                // Callback функцийг дуудах
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

    // Сар солих
    calendarChangeMonth(direction) {
        console.log("Сарыг өөрчилсөн: " + direction);
        const inc = ((direction === "next") ? + 1 : -1);
        let movedDate = new Date(this.currentDate);
        movedDate.setMonth(movedDate.getMonth() + inc);
        
        if (movedDate.getFullYear() === this.fixedDate.getFullYear() 
            && movedDate.getMonth() === this.fixedDate.getMonth()) movedDate = this.fixedDate;

        this.currentDate = movedDate;

        // Calendar толгойг шинэчлэх
        this.element.firstChild.firstChild.childNodes[1].replaceWith(
            this.calendarHeaderMonth(this.currentDate)
        );  
        // Calendar хүснэгтийг шинэчлэх
        this.element.firstChild.lastChild.replaceWith(
            this.calendarTable(this.currentDate)
        );  
    }
}