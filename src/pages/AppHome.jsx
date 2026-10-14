import LogoutButton from "../components/LogoutButton";
function AppHome() {
    return (
        <main>
            <h1>Panel de administración</h1>
            <p>Desde aquí podrás gestionar el inventario.</p>
            <LogoutButton />
        </main>
    );
}

export default AppHome;