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

/**
 * Configura la detección automática de desconexión de cámara y reintentos
 * @param {HTMLVideoElement} videoElement - El elemento video donde se muestra el stream
 * @param {string} deviceId - ID del dispositivo de cámara
 * @param {function} onStreamReady - Callback cuando el stream está listo
 * @param {number} maxRetries - Número máximo de reintentos (default: 5)
 * @param {number} retryDelay - Tiempo en ms entre reintentos (default: 3000)
 * @returns {function} Función para limpiar los listeners
 */
const setupCameraAutoReconnect = (
    videoElement, 
    deviceId, 
    onStreamReady, 
    maxRetries = 5,
    retryDelay = 3000
) => {
    let currentRetries = 0;
    let reconnectTimeout = null;
    let isManuallyDisconnected = false;

    const attemptReconnect = async () => {
        if (isManuallyDisconnected) return;
        
        if (currentRetries >= maxRetries) {
            console.error('Máximo número de reintentos alcanzado. No se pudo reconectar la cámara');
            return;
        }

        currentRetries++;
        console.log(`Intentando reconectar cámara (intento ${currentRetries}/${maxRetries})...`);

        try {
            const stream = await getVideoStream(deviceId);
            videoElement.srcObject = stream;
            currentRetries = 0; // Reset counter on successful reconnection
            console.log('Cámara reconectada exitosamente');
            
            if (onStreamReady) {
                onStreamReady(stream);
            }
            
            // Reiniciar la detección de tracks
            setupTrackEndListener(stream);
        } catch (error) {
            console.error(`Error al reconectar cámara: ${error.message}`);
            reconnectTimeout = setTimeout(attemptReconnect, retryDelay);
        }
    };

    const setupTrackEndListener = (stream) => {
        stream.getTracks().forEach(track => {
            track.onended = () => {
                console.warn('Track de cámara finalizado, intentando reconectar...');
                if (!isManuallyDisconnected) {
                    attemptReconnect();
                }
            };
        });
    };

    // Escuchar cambios en dispositivos
    const handleDeviceChange = async () => {
        console.log('Cambio detectado en dispositivos, verificando cámara...');
        const availableDevices = await availableCameras();
        const cameraStillAvailable = availableDevices.some(device => device.deviceId === deviceId);
        
        if (!cameraStillAvailable && !isManuallyDisconnected) {
            console.warn('Cámara desconectada, intentando reconectar...');
            attemptReconnect();
        }
    };

    // Agregar listener para cuando el stream falla
    videoElement.addEventListener('error', () => {
        console.error('Error en el elemento video');
        if (!isManuallyDisconnected) {
            attemptReconnect();
        }
    });

    // Listener para detectar cambios en dispositivos (ej: desconectar/conectar cámara)
    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);

    // Configurar el stream inicial si existe
    if (videoElement.srcObject) {
        setupTrackEndListener(videoElement.srcObject);
    }

    // Función para limpiar
    const cleanup = () => {
        isManuallyDisconnected = true;
        if (reconnectTimeout) {
            clearTimeout(reconnectTimeout);
        }
        navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange);
    };

    return cleanup;
};


export { availableCameras, freeVideoStream, getVideoStream, setupCameraAutoReconnect }