import Navbar from "../components/navbar.tsx";
import Map from "../components/MapView.tsx";

function Dashboard() {
    return (
        <div>
            <Navbar variant="default" />
            <Map />
        </div>
    )
}

export default Dashboard;
