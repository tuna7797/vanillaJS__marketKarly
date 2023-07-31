import { getNode, bindEvent, tiger, insertLast } from "./../../lib/index.js";

const button_check_usedId = getNode("#button_check_usedId");
const textInput_userId = getNode("#register_user_id");

//data.json에서 id배열 가져오기
async function getUsersDate() {
  const response = await tiger.get("http://localhost:3000/registered_users");

  const arrUsers = response.data;
  const arrId = [];
  arrUsers.map((item) => {
    arrId.push(item.id);
  });
  return arrId;
}

//입력된 id가 회원가입된 id와 중복되는지 확인
async function check_usedId() {
  const usedId = await getUsersDate();
  let id_to_validate = textInput_userId.value;

  let bool = usedId.some((item) => {
    return item === id_to_validate;
  });
  return bool;
}

//id 사용가능/불가능 alert
function createMessage_usableId(boolean) {
  if (!boolean) {
    globalThis.alert("사용 가능한 id 입니다");
  } else {
    globalThis.alert("이미 사용된 id 입니다");
  }
}

//중복검사 버튼 클릭시 이벤트 생성
async function handler_usedId(e) {
  e.preventDefault();

  let boolean_usedId = await check_usedId();
  createMessage_usableId(boolean_usedId);
}

export function event_check_usedId(){
  bindEvent(button_check_usedId, "click", handler_usedId);
}

//카멜+케밥으로 고치기