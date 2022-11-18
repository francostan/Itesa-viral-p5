export default Register;

function Register() {
  return (
    <div>
      <h4>Registro</h4>
      <div>
        <form action="/api/users/register" method="post">
          <div>
            <label>Apodo</label>
            <input name="username" type="text" required />
          </div>

          <div>
            <label>Correo electrónico</label>
            <input name="email" type="email" required />
          </div>

          <div>
            <label>Confirmar correo electrónico</label>
            <input name="confirm-email" type="email" required />
          </div>

          <div>
            <label>Contraseña</label>
            <input name="password" type="password" required />
          </div>

          <div>
            <label>Confirmar contraseña</label>
            <input name="password" type="password" required />
          </div>

          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}
