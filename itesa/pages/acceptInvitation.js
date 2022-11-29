//Página a la que se llega desde mail de invitación,

//Es un formulario de registro (nuevo usuario) que además permite ingresar el código de invitación del que invita. El código puede incluirse en la URL para usarlo en la ruta sin que el usuario tenga que ingresarlo manualmente

//Con esto se crea el nuevo usuario, y se modifica la tabla "Invitations" para pasar a "true" el booleano de control.

//Aparte de debe agregar a la tabla "Awards" el premio al que invitó y el premio al nuevo usuario por registrarse

// en realidad se usará el mismo componente REGISTER que:
// - deberá permitir registrarse con y sin código de referido
// - si se llega desde el link, el código se autocompleta en el campo correspondiente
// - el código de referido puede completarse manualmente
