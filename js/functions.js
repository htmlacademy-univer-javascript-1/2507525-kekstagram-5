const checkLengthString = function(phrase, maxLength){
  if (phrase.length <= maxLength){
    return true;
  }else{
    return false;
  }
};

const checkPalindrome = function(phrase){
  let normalString = phrase.replaceAll(' ','');
  normalString = normalString.toUpperCase();
  let newPhrase='';
  for (let i=normalString.length-1; i>=0;i--){
    newPhrase+=normalString[i];
  }
  if (newPhrase === normalString){
    return true;
  }
  return false;
};

