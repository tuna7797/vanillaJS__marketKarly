import { getNode,bindEvent,tiger } from "./../../lib/index.js";

const button_check_usedId = getNode('#button_check_usedId');
const textInput_userId = getNode('#register_user_id');

async function getUsersDate(){
  
  const response = await tiger.get('http://localhost:3000/registered_users');
  
  const arrUsers = response.data;
  const arrId = []
  arrUsers.map((item)=>{
    arrId.push(item.id);
  })
  return arrId;
}


async function check_usedId(){
  const usedId = await getUsersDate();
  let id_to_validate = textInput_userId.value;
  
  console.log(usedId);
  console.log(id_to_validate);
  
  let boolean_usedId = usedId.forEach((item)=>{
    if(item === id_to_validate){
      console.log('already used');
    }
  });

  console.log(boolean_usedId);
}

function createMessage_usableId(e){
  e.preventDefault();
  check_usedId()
  }

bindEvent(button_check_usedId,'click',createMessage_usableId);