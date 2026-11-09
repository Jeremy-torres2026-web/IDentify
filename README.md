# IDentify — Student Recognition Prototype

**Bilingual project documentation / Documentación bilingüe**

IDentify is a browser-based student-recognition prototype that uses a Teachable Machine image-classification model and a device camera to compare a live frame against the model's trained classes. When a configured class reaches the confidence threshold, the interface displays a corresponding sample student badge.

IDentify es un prototipo de reconocimiento estudiantil basado en navegador. Utiliza un modelo de clasificación de imágenes de Teachable Machine y la cámara del dispositivo para comparar imágenes en vivo con las clases entrenadas. Cuando una clase configurada alcanza el umbral de confianza, la interfaz muestra la credencial de ejemplo correspondiente.

## Features / Funcionalidades

- Starts and stops the browser camera with user permission.
- Loads the exported Teachable Machine model from the local project directory.
- Runs image predictions on camera frames.
- Uses a 90% confidence threshold for displaying a configured match.
- Displays a sample digital badge and updates the student roster.
- Keeps camera processing in the browser; the project code does not upload camera frames to a server.

- Inicia y detiene la cámara del navegador con autorización del usuario.
- Carga el modelo exportado de Teachable Machine desde la carpeta local del proyecto.
- Ejecuta predicciones sobre los fotogramas de la cámara.
- Utiliza un umbral de confianza del 90% para mostrar una coincidencia configurada.
- Muestra una credencial digital de ejemplo y actualiza el directorio estudiantil.
- Procesa la cámara en el navegador; el código del proyecto no carga los fotogramas a un servidor.

## Technology / Tecnologías

- HTML5 and CSS3
- JavaScript
- TensorFlow.js / Teachable Machine image library
- Teachable Machine exported model

## Project structure / Estructura

~~~text
IDentify/
├── my-model/
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   └── tm-my-image-model/
│       ├── metadata.json
│       ├── model.json
│       └── weights.bin
└── tm model/
    └── IDentify.tm
~~~

## Run locally / Ejecución local

Camera access generally requires HTTPS or localhost. Do not rely on opening the HTML file directly.

El acceso a la cámara generalmente requiere HTTPS o localhost. No dependas de abrir el archivo HTML directamente.

1. Clone or download the repository.
2. Open the repository folder in a terminal.
3. Start a local static server from the \`my-model\` directory. For example, with Python:

~~~bash
cd my-model
python -m http.server 8000
~~~

4. Open \`http://localhost:8000\` in a browser.
5. Allow camera access and select **Start recognition**.

1. Clona o descarga el repositorio.
2. Abre la carpeta del repositorio en una terminal.
3. Inicia un servidor estático local desde \`my-model\`. Por ejemplo, con Python:

~~~bash
cd my-model
python -m http.server 8000
~~~

4. Abre \`http://localhost:8000\` en el navegador.
5. Autoriza el acceso a la cámara y selecciona **Iniciar reconocimiento**.

## Model and matching logic / Modelo y lógica de coincidencia

The application loads \`model.json\` and \`metadata.json\` from \`my-model/tm-my-image-model/\`. The JavaScript maps the trained classes to sample roster entries and only displays a badge when a configured class reaches the 0.90 confidence threshold.

La aplicación carga \`model.json\` y \`metadata.json\` desde \`my-model/tm-my-image-model/\`. JavaScript relaciona las clases entrenadas con entradas de ejemplo del directorio y solo muestra una credencial cuando una clase configurada alcanza el umbral de confianza de 0.90.

## Privacy, safety, and limitations / Privacidad, seguridad y limitaciones

This is an educational prototype, not a reliable identity-verification or access-control system. A confidence score is not proof that a person is who the model predicts. Recognition quality depends on training data, camera conditions, lighting, and model limitations.

Este es un prototipo educativo, no un sistema fiable de verificación de identidad ni de control de acceso. Un porcentaje de confianza no demuestra que una persona sea quien predice el modelo. La calidad del reconocimiento depende de los datos de entrenamiento, la cámara, la iluminación y las limitaciones del modelo.

The repository currently contains example names and demographic details in its client-side code. Before using this project with real students, obtain informed consent, minimize personal data, replace sample records, and review applicable privacy requirements. Do not publish identifiable student data or images in a public repository.

El repositorio contiene actualmente nombres y datos demográficos de ejemplo en el código del cliente. Antes de utilizar este proyecto con estudiantes reales, obtén consentimiento informado, minimiza los datos personales, reemplaza los registros de ejemplo y revisa los requisitos de privacidad aplicables. No publiques datos ni imágenes identificables de estudiantes en un repositorio público.

## Team context / Contexto del equipo

This was a collaborative academic project. The repository preserves the team's prototype and should not be described as a solo project. The current commit history does not fully document every teammate's individual contribution.

Fue un proyecto académico colaborativo. El repositorio conserva el prototipo del equipo y no debe describirse como un proyecto individual. El historial de commits actual no documenta por completo el aporte individual de cada compañero.
