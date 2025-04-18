"use strict";

function Cs142TemplateProcessor(template) {
    console.log(template); // Загварыг хэвлэж харуулах
    this.template = template; // Загварыг this.template дээр хадгалах
}

Cs142TemplateProcessor.prototype.fillIn = function(dictionary) {
    const template = this.template; // Загварыг хувьсагчид хадгалах
    console.log(dictionary); // Dictionary объектыг хэвлэж харуулах

    let result = ""; // Эцсийн үр дүнг хадгалах хувьсагч
    let i = 0;

    // Template-ийг дүрсэлж, placeholder-уудыг dictionary-ээс утгаар солих
    while (i < template.length) {
        if (template[i] === "{" && template[i + 1] === "{") {
            let placeholder = "";
            i += 2; // "{{"-ийг алгасах

            // Placeholder-ийг унших
            while (i < template.length && !(template[i] === "}" && template[i + 1] === "}")) {
                placeholder += template[i];
                i++;
            }

            i += 2;

            // Dictionary-ээс утгыг олох
            result += dictionary[placeholder] || "";
        } else {
            // Placeholder биш, энгийн текст байвал
            result += template[i];
            i++;
        }
    }

    console.log(result); // Дүүргэсэн загварыг хэвлэж харуулах
    return result;
};