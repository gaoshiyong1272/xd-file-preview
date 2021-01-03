
const pdfType = 'PDF';
const imagesType = ['JPEG', 'JPG', 'PNG', 'GIF']
const wordType = ['XLS','PPT','DOC', 'DOCX', 'XLSX', 'PPTX'];
import image from "@/components/preview/image";

export function preview(obj) {
  let type = obj.type.toLocaleUpperCase();
  /**启动pdf预览***/
  if(type === pdfType) {
    image(obj);
    return true;
  }

  /**图片格式预览**/
  if(JSON.stringify(imagesType).indexOf(type) > -1) {
    image(obj);
    return true;
  }

  /**word 文档预览**/
  if(JSON.stringify(wordType).indexOf(type) > -1){
    vm.$officePreview(obj)
    return true;
  }
  return false;
}
