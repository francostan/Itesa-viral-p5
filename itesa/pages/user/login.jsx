export default logIn;

function logIn() {
  return (
    <div>
      <h4>Inicio de sesión</h4>
      <div>
        <form>
          <div>
            <label>Correo electrónico</label>
            <input name="email" type="email" required />
          </div>

          <div>
            <label>Contraseña</label>
            <input name="password" type="password" required />
          </div>

          <h5>Olvidaste tu contraseña?</h5>

          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}
