import Start from "./components/start";
import CameraSelector from "./components/cameraSelector";


const Router = (currentPage) => {

    switch (currentPage) {
        case 'START':
            return <Start />;
        case 'CAMERA':
            return <CameraSelector />;
        case 'CAPTURE':
            return <div> CAPTURE </div>;
        default:
            return <Start />;
    }
};

export default Router;

