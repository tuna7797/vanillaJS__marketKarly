import { getNode, bindEvent, tiger, insertLast } from "./../../lib/index.js";

const inputId = getNode("#login_inputId");
const inputPw = getNode("#login_inputPw");
const login_button= getNode("#login_button_submit");

//data.json 가져오기
async function getUserDate() {
  const response = await tiger.get("http://localhost:3000/registered_users");

  const objUsers = response.data;
  return objUsers;
}

//등록된 id배열 가져오기
async function getIds() {
  const objUser = await getUserDate()
  const arrId = [];
  objUser.map((item) => {
    arrId.push(item.id);
  });
  return arrId;
}
console.log(await getIds())

//등록된  pw배열 가져오기
async function getPws() {
  const objUser = await getUserDate()
  const arrPw = [];
  objUser.map((item) => {
    arrPw.push(item.pw);
  });
  return arrPw;
}
console.log(await getPws())

//등록된 uniqueId배열 가져오기
async function getUniqueIds() {
  const objUser = await getUserDate()
  const arrUniqueId = [];
  objUser.map((item) => {
    arrUniqueId.push(item.uniqueId);
  });
  return arrUniqueId;
}
console.log(await getUniqueIds())

//id입력을 가져오기
function getInputId(){
  return inputId.value;
}
// console.log(getInputId())




//입력id와 일치하는, 등록된 id배열의 인덱스 반환
async function get_idIndex() {
  const arrIds = await getIds();
  let inputId = getInputId();
  
  let index_foundId = arrIds.findIndex((item) => {
    return item === inputId;
  });
  console.log(index_foundId);
  return index_foundId;
}

//중복검사 버튼 클릭시 이벤트 생성
async function handler_login(e) {
  e.preventDefault();
  get_idIndex();
}

function event_check_usedId(){
  bindEvent(login_button, "click", handler_login);
}

//카멜+케밥으로 고치기