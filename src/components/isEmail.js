export default function isEmail(email) {
  var pattern = new RegExp(/\S+@\S+\.\S+/);
  return !!pattern.test(email);
}
