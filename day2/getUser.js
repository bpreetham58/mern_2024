const users = [
    { id: 1, name: "john", age: 25 },
    { id: 2, name: "emily", age: 30 },
    { id: 3, name: "michael", age: 20 },
  ];
  
  function getuser(user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const sucess = true;
        if (sucess) {
          resolve(user);
        } else {
          reject("error occured");
        }
      }, 3000);
    });
  }
  
  function getUserById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const u = users.find((user) => user.id === id);
        if (u) {
          resolve(u);
        } else {
          reject("User not found");
        }
      }, 2000);
    });
  }