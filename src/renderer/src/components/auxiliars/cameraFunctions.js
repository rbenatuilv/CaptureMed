const availableCameras = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    return devices.filter(device => device.kind === 'videoinput')
}

const freeVideoStream = (stream) => {
    stream.getTracks().forEach(track => track.stop());
}

const getVideoStream = async (deviceId) => {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: deviceId }
    });
    return stream
}


export { availableCameras, freeVideoStream, getVideoStream }