export default function isPalindrome(str: string) {
  return str.split("").reverse().join("") === str;
}
