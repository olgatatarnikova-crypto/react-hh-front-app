import { useState } from "react";
import "./App.css";
import { CreateUserForm } from "./create-user-form";
import type { UserModel } from "./types";
import { UserList } from "./user-list";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {

  //изменения от другого разработчика
  //мы тут сделали огромное домашнее задание
  //что-то где-то изменить в больших количествах

  const [isLogin, setIsLogin] = useState<boolean>(false)

  //добавили кучу для pdf 
  //все есть, все работает
  const [editUser, setEditUser] = useState<UserModel | null>(null)

  return (
    <div className="d-flex flex-column gap-2 align-items-center p-3">
      <CreateUserForm editUser={editUser} onClick={ () => setEditUser(null)} />
      <UserList onEditClick={setEditUser}  editUser={editUser} resetUser={() => setEditUser(null)}/>
      
    </div>
  );
};

export default App;

// danger - красный
// warning - желтый
// success - зеленый
// primary - синий
// dark - темный
// secondary - серый

//bg - фон
//text - текст
//btn- кнопка

// 1-5 (от маленькго до большого)

// h (заголовок)
// fs (размер шрифта),
// fw (жирность шрифта)
// 1 - самый значимый
// 6 - самый мелкий

// d-flex flex-row - гибкий элемент в строку
// d-flex flex-column - в колокну

// w - ширна (width) 25, 50, 75, 100

// justify-content - расположение по горизонтали
// align-items - расположение элементов по вертикали

// start - начало (все слева)
// center - (по центру)
// end - конец (все справа)
// between - по всей строке равномерно (между концом и началом)

// gap (1-5) промежуток между элементами

// m (margin) - Отступы снаружи элемента (1-5)
// p (padding) - Отступы внутри элемента (1-5)

// t (top - вверх)
// b - (bottom - низ)
// s - (start - левая сторона)
// e - (end - правя сторона)
