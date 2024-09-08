// main.js
const { Worker } = require('worker_threads');

// Función para crear un nuevo worker
function createWorker() {
    const worker = new Worker('./app/worker/workerOutStock.js');

    // Escucha los mensajes que envía el worker
    worker.on('message', (message) => {
        console.log('Order message ML');
        console.log(message)
        //console.log(JSON.stringify(message));
        //console.log(message);
    });

    // Escucha si ocurre algún error
    worker.on('error', (error) => {
        console.error(`Error en el worker: ${error}`);
    });

    // Escucha cuando el worker finaliza su tarea
    worker.on('exit', (code) => {
        if (code !== 0) {
            console.error(`Worker terminó con el código ${code}`);
        }
    });

    return worker;
}

exports.order = async (orderMessage) => {
    console.log(`[orderWorker.order......] init`);

    if ('resource' in orderMessage) {
        // Crear dos workers
        const worker1 = createWorker();
        //const worker2 = createWorker();
        //console.log(orderMessage)
        // Enviar mensajes a los workers
        worker1.postMessage(orderMessage.resource);
        //worker2.postMessage('Hola desde el main a worker 2');

    }
    else {
        console.log('not exist resource field in object!');
    }


    console.log(`[orderWorker.order] end`);

}




