"use strict";

function Cs142TemplateProcessor(template){
    console.log(template);
    this.template= template;
}

Cs142TemplateProcessor.prototype.fillIn = function(dictionary){
    let template = this.template;
    console.log(dictionary);

    if(template.includes("{{month}}")){
      template = template.replace("{{month}}",dictionary.month);
    }
  
    if(template.includes("{{day}}")){
      template = template.replace("{{day}}",dictionary.day);
    }
  
    if(template.includes("{{year}}")){
      template = template.replace("{{year}}",dictionary.year);
    }

    console.log(template);
    return template;
};