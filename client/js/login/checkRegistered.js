import { getNode, bindEvent, tiger, insertLast } from './../../lib/index.js';

const inputId = getNode('#login_inputId');
const inputPw = getNode('#login_inputPw');
const login_button = getNode('#login_button_submit');

//data.json 가져오기
async function getUserDate() {
  const response = await tiger.get('http://localhost:3000/registered_users');

  const objUsers = response.data;
  return objUsers;
}

//등록된 id배열 가져오기
async function getIdArr() {
  const objUser = await getUserDate();
  const arrId = [];
  objUser.map((item) => {
    arrId.push(item.id);
  });
  return arrId;
}
// console.log(await getIdArr());

//등록된  pw배열 가져오기
async function getPwArr() {
  const objUser = await getUserDate();
  const arrPw = [];
  objUser.map((item) => {
    arrPw.push(item.pw);
  });
  return arrPw;
}
// console.log(await getPwArr());

//등록된 uniqueId배열 가져오기
async function getUniqueIdArr() {
  const objUser = await getUserDate();
  const arrUniqueId = [];
  objUser.map((item) => {
    arrUniqueId.push(item.uniqueId);
  });
  return arrUniqueId;
}
// console.log(await getUniqueIdArr());

//id입력을 가져오기
function getInputId() {
  return inputId.value;
}
// console.log(getInputId())

//pw입력을 가져오기
function getInputPw() {
  return inputPw.value;
}

//id input과 일치하는, id배열의 인덱스 반환
async function get_idIndex() {
  const arrIds = await getIdArr();
  let inputId = getInputId();

  let index_foundId = arrIds.findIndex((item) => {
    return item === inputId;
  });

  return index_foundId;
}

//indexId에 해당하는 pw인지 확인
async function check_registeredPw(indexId) {
  const arrPw = await getPwArr();
  let inputPw = getInputPw();

  return inputPw === arrPw[indexId];
}

//indexId에 해당하는 uniqueId를 반환
async function getUniqueId(indexId) {
  let arrUniqueId = await getUniqueIdArr();
  return arrUniqueId[indexId];
}

//로컬 스토리지에 로그인 상태를 저장
async function localStorage_login(is_registered_user, indexId) {
  let uniqueId = await getUniqueId(indexId);
  console.log(uniqueId);
  localStorage.setItem('currentUser_uniqueId', uniqueId);
}

//중복검사 버튼 클릭시 이벤트 생성
async function handler_login(e) {
  e.preventDefault();
  let indexId = await get_idIndex();
  let is_registered_user = await check_registeredPw(indexId);
  console.log(indexId);
  console.log(is_registered_user);
  if (is_registered_user) {
    localStorage_login(is_registered_user, indexId);
  }
}

export function event_login() {
  bindEvent(login_button, 'click', handler_login);
}
