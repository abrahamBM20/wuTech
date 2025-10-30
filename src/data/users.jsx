export const users = [
  {
    id: 1,
    user: "abraham",
    pass: "admin123",
    nombre: "Abraham Barrera",
    email: "abr.barrera@duocuc.cl",
    rol: "admin",
    direccion: "",
    tarjeta: {
      numero: "1111 2222 3333 4444",
      titular: "Abraham Barrera",
      expiracion: "12/27",
      cvv: "123",
      valida: true
    }
  },
  {
    id: 2,
    user: "alexis",
    pass: "user123",
    nombre: "Alexis Gaona",
    email: "al.gaona@duocuc.cl",
    rol: "cliente",
    direccion: "",
    tarjeta: {
      numero: "5555 6666 7777 8888",
      titular: "Alexis Gaona",
      expiracion: "09/26",
      cvv: "456",
      valida: false
    }
  },
  {
    id: 3,
    user: "sebastian",
    pass: "user123",
    nombre: "Sebastian Bahamondes",
    email: "seb.bahamondes@duocuc.cl",
    rol: "cliente",
    direccion: "",
    tarjeta: {
      numero: "9999 8888 7777 6666",
      titular: "Sebastian Bahamondes",
      expiracion: "01/24",
      cvv: "789",
      valida: true
    }
  }
];