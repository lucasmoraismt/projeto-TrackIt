export default function isURL(str) {
  var pattern = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
  return !!pattern.test(str);
}
