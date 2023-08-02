import { getNode, bindEvent, tiger, insertLast } from "./../../lib/index.js";

const register_node_firstPw = getNode("#register_user_pw_first");
const register_node_secondPw = getNode("#register_user_pw_second");
const button_doubleCheck = getNode("#button_doubleCheck_pw");








//pw을 위한 정규표현식
function regular_expression_pw(){
  const regular_expression_pw = /^(?=.*[!@#$%^&*(),.?":{}|<>])[!@#$%^&*(),.?":{}|<>\w]{6,16}$/;
  return regular_expression_pw;
}

//입력된 pw가 정규식과 일치하는지 확인
function check_regex() {
  const regex = regular_expression_pw();
  return regex.test(register_node_firstPw.value);
}

//firstPw의 정규표현식 통과여부 체크
function createMessage_regular_expression_pw() {
  let bool_regex = check_regex();
  if(!bool_regex){
    console.log('비밀번호는 하나 이상의 특수문자를 포함하며 6자이상 16자 이하여야 합니다')
  }else{
    console.log('사용가능한 비밀번호 입니다')  
  }
}

//firstPw 키다운시 정규표현식 통과여부 알림
function handler_keydown_firstPw(e) {
  // e.preventDefault();
  createMessage_regular_expression_pw();
}

export function event_regular_expression_pw(){
  bindEvent(register_node_firstPw, "keyup",handler_keydown_firstPw);
}
// event_regular_expression_pw();









// fistPw/secondPw 일치확인
function check_pws(){
  return register_node_firstPw.value === register_node_secondPw.value;
}

//중복검사 버튼 클릭시 경고 생성
function handler_button_doubleCheck_pw(e) {
  e.preventDefault();
  let bool_doubleCheck = check_pws();
  if(!bool_doubleCheck){
    globalThis.alert('비밀번호가 일치하지 않습니다');
  }
  else{
    globalThis.alert('비밀번호가 일치합니다');
  }
  // let boolean_usedId = await check_usedId();
  // createMessage_usableId(boolean_usedId);
}
export function event_doubleCheck_pw(){
  bindEvent(button_doubleCheck, "click",handler_button_doubleCheck_pw);
}
// event_doubleCheck_pw();