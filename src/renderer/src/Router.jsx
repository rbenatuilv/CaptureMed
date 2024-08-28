import Start from "./components/start/start";
import CameraSelector from "./components/camera/camera";
import Capture from "./components/capture/capture";


const Router = (currentPage) => {

    switch (currentPage) {
        case 'START':
            return <Start />;
        case 'CAMERA':
            return <CameraSelector />;
        case 'CAPTURE':
            return <Capture />;
        case 'REVIEW':
            return <div>REVIEW</div>
        default:
            return <Start />;
    }
};

export default Router;

