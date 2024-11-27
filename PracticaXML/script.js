document.addEventListener("DOMContentLoaded", function() {
    //CSS en grid
    const app = document.getElementById("app");

    const seccionIzquierda = document.createElement("div");
    seccionIzquierda.classList.add("left-grid");

    const seccionDerecha = document.createElement("div");
    seccionDerecha.classList.add("right-grid");

    const contenedorDetalles = document.createElement("div");
    contenedorDetalles.id = "pelicula-detalles";
    seccionDerecha.appendChild(contenedorDetalles);

    app.appendChild(seccionIzquierda);
    app.appendChild(seccionDerecha);

    //Conectamos con el XML
    const conexion = new XMLHttpRequest();
    conexion.open("GET", "peliculas.xml");  
    //Comprobamos que la conexión funciona
    conexion.onreadystatechange = function() {
        if (conexion.readyState === 4) { 
                //metemos la información del  XML en un objeto
                const xml = conexion.responseXML;
                
                if (xml) {
                    const peliculas = xml.querySelectorAll("pelicula");
                     
                    peliculas.forEach(pelicula => {
                        const div = document.createElement("div");
                        div.classList.add("pelicula");

                        // Crear la imagen
                        const imagen = document.createElement("img");
                        imagen.src = pelicula.querySelector("imagen").textContent;
                        imagen.alt = pelicula.querySelector("titulo").textContent;
                        div.appendChild(imagen);

                        // Crear el título debajo de la imagen
                        const titulo = document.createElement("h4");
                        titulo.textContent = pelicula.querySelector("titulo").textContent;
                        div.appendChild(titulo);

                        // Al hacer clic en la imagen, se muestran los detalles en el lado derecho
                        imagen.addEventListener("click", function() {
                            const trailer = pelicula.querySelector("trailer").textContent;
                            const director = pelicula.querySelector("director").textContent;
                            const duracion = pelicula.querySelector("duracion").textContent;
                            const nacionalidad = pelicula.querySelector("nacionalidad").textContent;
                            const actores = pelicula.querySelector("actores").textContent;
                            const genero = pelicula.querySelector("genero").textContent;
                            const sinopsis = pelicula.querySelector("sinopsis").textContent;

                            // Actualizar los detalles en el lado derecho
                            contenedorDetalles.innerHTML = `
                                <video controls><source src="${trailer}" type="video/mp4"></video>
                                <h3>${pelicula.querySelector("titulo").textContent}</h3>
                                <div class="info">
                                    <p><strong>Director:</strong> ${director}</p>
                                    <p><strong>Duración:</strong> ${duracion}</p>
                                    <p><strong>Nacionalidad:</strong> ${nacionalidad}</p>
                                    <p><strong>Actores:</strong> ${actores}</p>
                                    <p><strong>Género:</strong> ${genero}</p>
                                    <p><strong>Sinopsis:</strong> ${sinopsis}</p>
                                </div>
                            `;
                        });
                        seccionIzquierda.appendChild(div);
                    });
            } else {
                console.error("Error al cargar el archivo XML. Estado: " + conexion.status);
            }
        }
    };
    conexion.send();
});
