'use strict';

class TableTemplate {
    static fillIn(id, dict, columnName) {
        const table = document.getElementById(id);
        const columnIndex = TableTemplate.parseTableHeader(table, dict, columnName);

        if (columnIndex < 0) {
            TableTemplate.fillInAllColumns(table, dict);
        } else {
            TableTemplate.fillInColumn(table, dict, columnIndex);
        }

        TableTemplate.resetVisibility(table);
    }

    static parseTableHeader(table, dict, columnName) {
        const headers = table.rows[0].querySelectorAll("td");
        let headerIndex = -1;

        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            const template = new Cs142TemplateProcessor(header.innerHTML);
            header.innerHTML = template.fillIn(dict);

            if (columnName === header.textContent) {
                headerIndex = i;
            }
        }

        return headerIndex;
    }
    
    static fillInColumn(table, dict, columnIndex) {
        for (let i = 1; i < table.rows.length; i++) {
            const cell = table.rows[i].querySelectorAll("td")[columnIndex];
            const template = new Cs142TemplateProcessor(cell.innerHTML);
            cell.innerHTML = template.fillIn(dict);
        }
    }

    static fillInAllColumns(table, dict) {
        const numColumns = table.rows[0].querySelectorAll("td").length;
        
        for (let i = 0; i < numColumns; i++) {
            TableTemplate.fillInColumn(table, dict, i);
        }
    }

    static resetVisibility(element) {
        element.style.visibility = "visible";
    }
}