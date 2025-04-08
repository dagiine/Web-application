"use strict";

function Cs142TemplateProcessor(template){
    console.log(template); // Загварыг хэвлэж харуулах
    this.template= template; // Загварыг this.template дээр хадгалах
}

Cs142TemplateProcessor.prototype.fillIn = function(dictionary){
    let template = this.template; // Загварыг хувьсагчид хадгалах
    console.log(dictionary); // Dictionary объектыг хэвлэж харуулах

    // Хэрэв загварт тухайн placeholder байвал, dictionary-оос авсан утгаар солино
    if(template.includes("{{month}}")){
      template = template.replace("{{month}}",dictionary.month);
    }
  
    if(template.includes("{{day}}")){
      template = template.replace("{{day}}",dictionary.day);
    }
  
    if(template.includes("{{year}}")){
      template = template.replace("{{year}}",dictionary.year);
    }

    console.log(template); // Дүүргэсэн загварыг хэвлэж харуулах
    return template;
};