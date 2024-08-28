import Start from "./components/start";
import { useSelector } from "react-redux";


const Router = () => {
    const nav = useSelector((state) => state.nav);


    switch (nav.currentPage) {
        case 'START':
            return <Start />;
        case 'CAMERA':
            return <div>HOLA</div>;
        default:
            return <Start />;
    }
};

export default Router;

