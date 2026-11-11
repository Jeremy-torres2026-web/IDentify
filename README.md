# IDentify — Student Image-Classification Prototype

**Bilingual project documentation / Documentación bilingüe**

## English

### Overview

IDentify is a browser-based academic prototype that explores how a trained image-classification model can be connected to a camera interface. It uses a Teachable Machine image model and TensorFlow.js to classify camera frames into configured classes. When a class reaches the configured confidence threshold, the interface displays a corresponding sample student badge.

The project demonstrates browser-side model integration and interface feedback. **It does not establish a person's identity.**

### What the prototype does

- Requests camera permission and starts or stops the video stream.
- Loads an exported Teachable Machine model from the project directory.
- Runs image predictions on frames in the browser.
- Applies a 90% confidence threshold to configured class matches.
- Displays a sample digital badge and updates the example student roster.
- Keeps camera-frame processing in the browser; the project code does not upload those frames to a server.

### Implementation

The application is built with HTML, CSS and JavaScript. TensorFlow.js and the Teachable Machine image library load the exported model files. JavaScript connects the camera stream to the model, evaluates predictions and maps trained classes to example roster entries.

### Technology

- HTML5 and CSS3
- JavaScript
- TensorFlow.js
- Teachable Machine image library
- Browser MediaDevices / Camera API

### Run locally

Camera access generally requires HTTPS or localhost. From the repository root:

~~~bash
cd my-model
python -m http.server 8000
~~~

Open http://localhost:8000, grant camera permission and select **Start recognition**.

### Limitations and privacy

This is a learning prototype, not a reliable identity-verification, attendance or access-control system. A model confidence score is not proof of identity. Results depend on training data, lighting, camera quality and model limitations.

The repository contains sample student names and demographic fields in client-side code. They are demonstration records, not an appropriate basis for handling real student data. Any real-world use would require informed consent, data minimization, stronger security and a review of applicable privacy requirements.

### Collaboration

IDentify was developed as a collaborative academic project. The repository represents a team prototype; it should not be interpreted as a solo implementation or as evidence that every module was written by one contributor.

---

## Español

### Descripción general

IDentify es un prototipo académico basado en navegador que explora cómo conectar un modelo entrenado de clasificación de imágenes con una interfaz de cámara. Utiliza un modelo de imágenes de Teachable Machine y TensorFlow.js para clasificar fotogramas en categorías configuradas. Cuando una categoría alcanza el umbral de confianza establecido, la interfaz muestra una credencial estudiantil de ejemplo.

El proyecto demuestra integración de modelos en el navegador y retroalimentación visual. **No verifica la identidad de una persona.**

### Qué hace el prototipo

- Solicita permiso para utilizar la cámara e inicia o detiene el video.
- Carga un modelo exportado de Teachable Machine desde el directorio del proyecto.
- Ejecuta predicciones sobre fotogramas de imagen en el navegador.
- Aplica un umbral de confianza del 90% a las coincidencias de clases configuradas.
- Muestra una credencial digital de ejemplo y actualiza un directorio estudiantil de muestra.
- Procesa los fotogramas de la cámara en el navegador; el código del proyecto no los envía a un servidor.

### Implementación

La aplicación está construida con HTML, CSS y JavaScript. TensorFlow.js y la biblioteca de imágenes de Teachable Machine cargan los archivos del modelo exportado. JavaScript conecta la cámara con el modelo, evalúa las predicciones y relaciona las clases entrenadas con registros de ejemplo.

### Tecnologías

- HTML5 y CSS3
- JavaScript
- TensorFlow.js
- Biblioteca de imágenes de Teachable Machine
- MediaDevices / Camera API del navegador

### Ejecución local

El acceso a la cámara generalmente requiere HTTPS o localhost. Desde la raíz del repositorio:

~~~bash
cd my-model
python -m http.server 8000
~~~

Abre http://localhost:8000, autoriza el acceso a la cámara y selecciona **Iniciar reconocimiento**.

### Limitaciones y privacidad

Este es un prototipo de aprendizaje, no un sistema fiable de verificación de identidad, asistencia o control de acceso. Un porcentaje de confianza del modelo no demuestra la identidad de una persona. Los resultados dependen de los datos de entrenamiento, la iluminación, la cámara y las limitaciones del modelo.

El repositorio contiene nombres y campos demográficos estudiantiles de ejemplo en el código del cliente. Son registros de demostración y no constituyen una base adecuada para manejar datos reales de estudiantes. Cualquier uso real requeriría consentimiento informado, minimización de datos, mayor seguridad y revisión de los requisitos de privacidad aplicables.

### Trabajo colaborativo

IDentify se desarrolló como proyecto académico colaborativo. El repositorio representa un prototipo de equipo; no debe interpretarse como una implementación individual ni como evidencia de que una sola persona escribió todos sus módulos.
